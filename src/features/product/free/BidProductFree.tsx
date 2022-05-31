import CustomImage from '@app/atoms/CustomImage';
import { AccessTime, AlarmOn, Apps, Place } from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	InputBase,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
// import Moment from 'react-moment';

const BidProductFree = ({ product }) => {
	return (
		<Fragment>
			<Stack
				direction="row"
				sx={{
					bgcolor: 'background.default',

					borderRadius: '8px',
					width: { xs: 'min(100%, 500px)', sm: 500 },
					height: 220,
					display: 'grid',
					gridTemplateColumns: '132px auto',
					gridAutoFlow: 'column',
					position: 'relative',
				}}
			>
				<Box
					sx={{
						height: { xs: 'auto', sm: 108 },
						width: 140,
						borderRadius: '8px',

						position: 'relative',
					}}
				>
					<CustomImage
						src={product.photos[0].url}
						alt="premium-product"
						sx={{
							height: 107,
							width: 140,
							borderRadius: '8px',
							objectFit: 'cover',
							filter: 'blur(2px)',
						}}
					/>
					<Box
						sx={{
							height: 24,
							width: 24,
							p: 0,
							bgcolor: '#fff',
							borderRadius: '50%',
							position: 'absolute',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							top: 16,
							right: '-10px',
							zIndex: 5,
						}}
					>
						<AccessTime
							color="error"
							sx={{ height: 20, width: 20, fontSize: 15 }}
						/>
					</Box>
					<Box
						sx={{
							position: 'absolute',
							left: 0,
							top: 0,
							height: '100%',
							width: 140,
						}}
					>
						<CustomImage
							src={product.photos[0].url}
							alt="premium-product"
							sx={{
								height: 108,
								width: '100%',
								borderRadius: '8px',
								objectFit: 'contain',
							}}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						p: 1,
						pt: 0.1,
						pl: '20px',
					}}
				>
					<Typography
						sx={{
							lineHeight: '18px',
							fontSize: 13,
							fontStyle: 'italic',
						}}
					>
						Want to bid? Hurry up!
					</Typography>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						sx={{ fontSize: { xs: 12, sm: 14 } }}
					>
						<Stack direction="column" spacing={0.1}>
							<Typography
								variant="body1"
								fontWeight={'bold'}
								color="error"
								sx={{ fontSize: 15, lineHeight: '16px' }}
							>
								00
							</Typography>
							<Typography
								variant="caption"
								sx={{
									fontWeight: 'normal',
									lineHeight: '11px',
									fontStyle: 'italic',
								}}
							>
								Day(s)
							</Typography>
						</Stack>
						<Stack direction="column" spacing={0.1}>
							<Typography
								variant="body1"
								fontWeight={'bold'}
								color="error"
								sx={{ fontSize: 15, lineHeight: '16px' }}
							>
								00
							</Typography>
							<Typography
								variant="caption"
								sx={{
									fontWeight: 'normal',
									lineHeight: '11px',
									fontStyle: 'italic',
								}}
							>
								Hours(s)
							</Typography>
						</Stack>
						<Stack direction="column" spacing={0.1}>
							<Typography
								variant="body1"
								fontWeight={'bold'}
								color="error"
								sx={{ fontSize: 15, lineHeight: '16px' }}
							>
								00
							</Typography>
							<Typography
								variant="caption"
								sx={{
									fontWeight: 'normal',
									lineHeight: '11px',
									fontStyle: 'italic',
								}}
							>
								Minutes(s)
							</Typography>
						</Stack>
					</Stack>

					<Typography
						variant="caption"
						sx={{
							fontWeight: 'normal',
							lineHeight: '11px',
						}}
					>
						ends at feb 09 2:14px
					</Typography>
				</Box>
				<Stack
					direction="row"
					sx={{
						bgcolor: '#fff',
						border: 1,
						borderColor: 'text.disabled',
						borderRadius: '8px',
						width: { xs: 'min(100%, 500px)', sm: 475 },
						height: { xs: 'auto' },
						display: 'grid',
						gridTemplateColumns: '132px auto',
						gridAutoFlow: 'column',
						position: 'absolute',
						top: 75,
						right: 0,
					}}
				>
					<Box
						sx={{
							p: 1,
							pl: '18px',
						}}
					>
						<Typography
							fontWeight={500}
							sx={{
								width: { xs: 'auto', sm: 260 },
								lineHeight: '16px',
								fontSize: { xs: 14 },

								WebkitLineClamp: 2,

								textOverflow: 'ellipsis',
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								display: '-webkit-box',
							}}
						>
							{product.title}
						</Typography>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							sx={{ fontSize: { xs: 12, sm: 14 } }}
						>
							<Stack direction="row" spacing={1} alignItems="center">
								<Place sx={{ fontSize: { xs: 13 }, color: '#00000060' }} />
								<Typography
									variant="caption"
									sx={{ fontSize: { xs: 13 }, color: '#00000060' }}
								>
									{product.location.district}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<Apps sx={{ fontSize: { xs: 13 }, color: '#00000060' }} />
								<Typography
									variant="caption"
									fontSize={16}
									sx={{ fontSize: { xs: 13 }, color: '#00000060' }}
								>
									{product.location.city}
								</Typography>
							</Stack>
						</Stack>
						<Divider sx={{ width: { xs: 'fit-content', sm: 420 } }} />
						<Stack
							direction="row"
							sx={{ width: { xs: 'fit-content', sm: 445 } }}
						>
							<Box sx={{ minWidth: { xs: 269, sm: 295 } }}>
								<Stack direction="row" spacing={{ xs: 1, sm: 6 }}>
									<Typography variant="caption" fontWeight={500}>
										Current Price
									</Typography>
									<Typography variant="caption" fontWeight={500}>
										TK. 1225
									</Typography>
								</Stack>
								<Stack direction="row" spacing={{ xs: 1, sm: 3.8 }}>
									<Typography variant="caption">Bid Starting Price</Typography>
									<Typography variant="caption">TK. 122</Typography>
								</Stack>
								<Stack
									direction="row"
									spacing={{ xs: 1, sm: 8.5 }}
									sx={{ width: '100%' }}
								>
									<Typography variant="caption">Your Price</Typography>
									<Stack direction="row" spacing={1}>
										<TextField
											hiddenLabel
											size="small"
											type={'number'}
											sx={{ width: 80 }}
											InputProps={{
												sx: {
													height: 30,
												},
											}}
										/>
										<Button
											color="primary"
											variant="contained"
											size="small"
											sx={{ height: 30, color: '#fff' }}
										>
											Bid
										</Button>
									</Stack>
								</Stack>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'end',
									width: '100%',
									pr: 1,
								}}
							>
								<Button
									size="small"
									variant="outlined"
									sx={{ borderColor: 'text.primary', color: 'text.primary' }}
								>
									Details
								</Button>
							</Box>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Fragment>
	);
};

export default BidProductFree;
