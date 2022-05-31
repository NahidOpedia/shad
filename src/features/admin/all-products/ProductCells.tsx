import React, { Fragment, useState } from 'react';
import { CustomTableCell } from './ProductTable';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
	Button,
	Checkbox,
	IconButton,
	MenuItem,
	Stack,
	TableCell,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import CustomImage from '@app/atoms/CustomImage';
import {
	ChatBubble,
	Check,
	CheckCircle,
	Clear,
	Edit,
	Notifications,
	PhotoCamera,
	PlayArrow,
} from '@mui/icons-material';
import { Rows } from './types/productTableTypes';
import { approvePhoto } from './actions/productActions';

const productStatusEnums = [
	'active',
	'pause',
	'inactive',
	'review',
	'delete with reason',
	'delete with message',
	'active with message',
	'inactive with message',
];
interface Props {
	row: Rows;
	index: number;
	isItemSelected: boolean;
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string
	) => void;
	labelId: string;
	setValid: React.Dispatch<React.SetStateAction<string>>;
	setInvalid: React.Dispatch<React.SetStateAction<string>>;
}

const photoIconSx = {
	position: 'absolute',

	bottom: 0,
	borderRadius: 0,
	bgcolor: '#fff',
	border: 2,
	height: 25,
	width: 25,
};

const ProductCells = ({
	row,
	index,
	isItemSelected,
	handleClick,
	labelId,
	setInvalid,
	setValid,
}: Props) => {
	const [productStatus, setProductStatus] = useState(row.productStatus);

	return (
		<React.Fragment key={row.id}>
			<TableRow
				// onClick={(event) => handleClick(event, row.productId)}
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				selected={isItemSelected}
				sx={{
					bgcolor: index % 2 === 0 ? 'rgba(0,0,0,.05)' : '#fff',
				}}
			>
				<TableCell
					rowSpan={2}
					sx={{ border: 1, borderColor: 'text.disabled', p: 0.5 }}
				>
					<Checkbox
						onClick={(event) => handleClick(event, row.productId)}
						color="primary"
						checked={isItemSelected}
						inputProps={{
							'aria-labelledby': labelId,
						}}
					/>
				</TableCell>
				<CustomTableCell rowSpan={2} sx={{ width: 243 }}>
					<Swiper
						modules={[Navigation]}
						navigation
						slidesPerView={2}
						style={{ width: 243, paddingRight: '18px' }}
					>
						{row.productPicture.map((picture) => (
							<SwiperSlide
								key={picture.url}
								style={{ width: '45%', position: 'relative' }}
							>
								<CustomImage
									src={picture.url}
									height={80}
									width={100}
									sx={{
										objectFit: 'contain',
										border: 1,
										borderColor: 'text.disabled',
									}}
								/>
								{picture.accepted ? (
									<Fragment>
										<CheckCircle
											sx={{
												position: 'absolute',
												left: 3,
												bottom: 0,
												color: 'primary.main',
											}}
										/>
										<Tooltip title="Decline">
											<IconButton
												sx={{
													...photoIconSx,
													right: 3,
													borderColor: 'error.main',
												}}
											>
												<Clear sx={{ color: 'error.main', fontSize: 13 }} />
											</IconButton>
										</Tooltip>
									</Fragment>
								) : (
									<Fragment>
										<Tooltip title="Approve">
											<IconButton
												onClick={() =>
													approvePhoto({
														photoUrl: picture.url,
														valid: setValid,
														invalid: setInvalid,
														productId: row.productId,
													})
												}
												sx={{
													...photoIconSx,
													right: 3,
													borderColor: 'success.main',
												}}
											>
												<Check sx={{ color: 'success.main', fontSize: 13 }} />
											</IconButton>
										</Tooltip>
										<Tooltip title="Decline">
											<IconButton
												sx={{
													...photoIconSx,
													left: 3,
													borderColor: 'error.main',
												}}
											>
												<Clear sx={{ color: 'error.main', fontSize: 13 }} />
											</IconButton>
										</Tooltip>
									</Fragment>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</CustomTableCell>
				<CustomTableCell rowSpan={2}>
					<Stack direction={'column'} spacing={1}>
						<Typography variant="subtitle2" sx={{ fontSize: 12 }}>
							{row.productId}
						</Typography>
						<Stack direction="row" spacing={0.5}>
							<IconButton
								sx={{
									border: 1,
									borderColor: 'text.disabled',
									borderRadius: 0,
								}}
							>
								<ChatBubble />
							</IconButton>
							<IconButton
								sx={{
									border: 1,
									borderColor: 'text.disabled',
									borderRadius: 0,
								}}
							>
								<Notifications />
							</IconButton>
							<IconButton
								sx={{
									border: 1,
									borderColor: 'text.disabled',
									borderRadius: 0,
								}}
							>
								<PhotoCamera />
							</IconButton>
							<IconButton
								sx={{
									border: 1,
									borderColor: 'text.disabled',
									borderRadius: 0,
								}}
							>
								<PlayArrow />
							</IconButton>
						</Stack>
					</Stack>
				</CustomTableCell>
				<CustomTableCell>{row.category}</CustomTableCell>
				<CustomTableCell>{row.location}</CustomTableCell>
				<CustomTableCell>{row.postType}</CustomTableCell>
				<CustomTableCell>{row.marchent}</CustomTableCell>
				<CustomTableCell>{row.price}</CustomTableCell>
				<CustomTableCell>{row.reach}</CustomTableCell>
				<CustomTableCell>{row.click}</CustomTableCell>
				<CustomTableCell>{row.userType}</CustomTableCell>
				<CustomTableCell>{row.slots}</CustomTableCell>
				<CustomTableCell>{row.verify}</CustomTableCell>
				<CustomTableCell>
					<TextField
						sx={{ maxWidth: 90 }}
						select
						value={productStatus}
						onChange={(e) => setProductStatus(e.target.value)}
					>
						{productStatusEnums.map((status) => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</TextField>
				</CustomTableCell>
				<CustomTableCell>{row.report}</CustomTableCell>
				<CustomTableCell>
					<Stack direction={'row'} justifyContent="center">
						<Button
							size="small"
							variant="contained"
							color="warning"
							startIcon={<Edit />}
						>
							{row.editBy}
						</Button>
					</Stack>
				</CustomTableCell>
			</TableRow>
			<TableRow
				// onClick={(event) => handleClick(event, row.productId)}
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				selected={isItemSelected}
				sx={{
					bgcolor: index % 2 === 0 ? 'rgba(0,0,0,.05)' : '#fff',
				}}
			>
				<CustomTableCell colSpan={13} sx={{ p: 0.5, lineHeight: '19px' }}>
					<Typography
						align="left"
						sx={{
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							width: '85ch',
							overflow: 'hidden',
						}}
					>
						{row.description}
					</Typography>
				</CustomTableCell>
				{/* <TableCell align="right">{row.calories}</TableCell>
											<TableCell align="right">{row.fat}</TableCell>
											<TableCell align="right">{row.carbs}</TableCell>
											<TableCell align="right">{row.protein}</TableCell> */}
			</TableRow>
		</React.Fragment>
	);
};

export default ProductCells;
