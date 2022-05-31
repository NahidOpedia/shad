import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { CustomTableCell } from './ProductTable';
import { columns } from './types/productTableTypes';
import { visuallyHidden } from '@mui/utils';

interface Data {
	calories: number;
	carbs: number;
	fat: number;
	name: string;
	protein: number;
}

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
): Data {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
	};
}
type Order = 'asc' | 'desc';
interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

const ProductTableHead = (props: EnhancedTableProps) => {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell sx={{ border: 1, borderColor: 'text.disabled', p: 0.5 }}>
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{columns.map((headCell) => (
					<CustomTableCell
						key={headCell.field}
						align={headCell.align}
						sx={{
							...(headCell.lineHeight && { lineHeight: headCell.lineHeight }),
							minWidth: headCell.width,
							p: 0.5,
							fontSize: 13,
						}}
						sortDirection={orderBy === headCell.field ? order : false}
					>
						{headCell.sortable ? (
							<TableSortLabel
								active={orderBy === headCell.field}
								direction={orderBy === headCell.field ? order : 'asc'}
								// onClick={createSortHandler(headCell.field)}
							>
								{headCell.headerName}
								{orderBy === headCell.field ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							headCell.headerName
						)}
					</CustomTableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default ProductTableHead;
