/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomImage from '@app/atoms/CustomImage';
import { Button, Stack, styled } from '@mui/material';
import { columns, Rows, rows } from './types/productTableTypes';
import {
	ArrowForward,
	ArrowForwardIos,
	Camera,
	CameraFront,
	ChatBubble,
	Edit,
	Notifications,
	PhotoCamera,
	PlayArrow,
} from '@mui/icons-material';
import ProductTableHead from './ProductTableHead';

import useProductsTable from 'src/hooks/products/useProductsTable';
import API from '@app/api-getway/API';
import ProductCells from './ProductCells';
import { deleteProduct } from './actions/productActions';
import AlertMessage from '@features/shared/alert-message/AlertMessage';

interface Data {
	calories: number;
	carbs: number;
	fat: number;
	name: string;
	protein: number;
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
	border: `1px solid ${theme.palette.text.disabled}`,
	textAlign: 'center',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	padding: '0px',
}));

interface EnhancedTableToolbarProps {
	numSelected: number;
	selectedProductId: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const { numSelected, selectedProductId } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					All Products
				</Typography>
			)}
			{numSelected > 0 ? (
				<Stack direction="row" spacing={1}>
					{numSelected === 1 && (
						<Tooltip title="Edit">
							<IconButton>
								<Edit />
							</IconButton>
						</Tooltip>
					)}
					<Tooltip title="Delete">
						<IconButton
							onClick={() => {
								if (selectedProductId) {
									deleteProduct(selectedProductId);
								}
							}}
						>
							<DeleteIcon color="error" />
						</IconButton>
					</Tooltip>
				</Stack>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

export default function ProductTable() {
	const { products, isLoading, isError } = useProductsTable();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const swiperNextRef = React.useRef<HTMLButtonElement>(null);
	const [selectedProductId, setSelectedProductId] = React.useState('');
	const [valid, setValid] = React.useState('');
	const [invalid, setInvalid] = React.useState('');

	if (isLoading) {
		return <div>Loading products...</div>;
	}
	if (isError) {
		return <div>Failed to load products.</div>;
	}
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = []; // rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
		setSelectedProductId(id);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<AlertMessage
				duration={3000}
				invalid={invalid}
				valid={valid}
				setInvalid={setInvalid}
				setValid={setValid}
			/>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					selectedProductId={selectedProductId}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<ProductTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy as string}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
							{/* {stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								 */}
							{products.map((row: Rows, index: number) => {
								const isItemSelected = isSelected(row.productId);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<ProductCells
										handleClick={handleClick}
										index={index}
										isItemSelected={isItemSelected}
										labelId={labelId}
										row={row}
										key={row.productId}
										setValid={setValid}
										setInvalid={setInvalid}
									/>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
