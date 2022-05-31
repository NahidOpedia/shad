import { Add, Delete, Search } from '@mui/icons-material';
import {
	Box,
	Button,
	IconButton,
	Stack,
	styled,
	TableCell,
	Tooltip,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import AdminDialog from '../dialogs/AdminDialog';
import CreateProductDialog from './CreateProductDialog';
import ProductTable from './ProductTable';

const AllProducts = () => {
	const [openDialog, setOpenDialog] = useState('');
	const handleDialogOpen = (props: string) => {
		setOpenDialog((prev) => {
			if (prev === props) {
				return '';
			}
			return props;
		});
	};
	return (
		<Fragment>
			<Box component="main" sx={{ width: '100%' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						px: 2,

						borderBottom: 1,
						borderColor: 'text.disabled',
						alignItems: 'center',
					}}
				>
					<Stack direction={'row'} spacing={1}>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="error"
						>
							All
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Sell
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Rent
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Job
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Offer
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Bid
						</Button>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 62, height: 31 }}
							color="success"
						>
							Buy
						</Button>
					</Stack>
					<Stack direction={'row'} spacing={1}>
						<IconButton>
							<Delete color={'error'} />
						</IconButton>
						<Tooltip title="Add new product">
							<IconButton onClick={() => handleDialogOpen('add-product')}>
								<Add color={'success'} />
							</IconButton>
						</Tooltip>
						<Tooltip title="Search products">
							<IconButton>
								<Search color={'success'} />
							</IconButton>
						</Tooltip>
					</Stack>
				</Box>
				<Box sx={{ py: 1 }}>
					<ProductTable />
				</Box>
			</Box>
			<CreateProductDialog
				open={openDialog === 'add-product'}
				handleClose={() => handleDialogOpen('add-product')}
				id={'add-product'}
				title={'Add Product'}
			/>
		</Fragment>
	);
};

export default AllProducts;
