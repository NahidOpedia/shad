import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Apps, Place } from '@mui/icons-material';
import CustomImage from '@app/atoms/CustomImage';

const OfferProductPremium = () => {
	return (
		<Card
			sx={{
				bgcolor: '#d4d9dd',
				width: { xs: 'min(100%, 500px)', sm: 500 },
				height: { xs: 'auto', sm: 360 },
				borderRadius: '10px',
			}}
		>
			<Box
				sx={{
					height: 263,
					maxWidth: 500,
					position: 'relative',
					borderRadius: '10px',
				}}
			>
				<CustomImage
					src={'/assets/premium-cover-pic.jpg'}
					alt="premium-product"
					sx={{
						height: '100%',
						width: '100%',
						borderRadius: '10px',
						filter: 'blur(2px)',
					}}
				/>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						height: '100%',
						width: '86%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<CustomImage
						src={'/assets/premium-cover-pic.jpg'}
						alt="premium-product"
						sx={{
							height: '100%',
							width: '100%',
							borderRadius: '10px',
						}}
					/>
				</Box>
				{/* <Box
					sx={{
						// height: 30,
						// width: 60,
						borderLeft: 3,
						borderRight: 3,
						borderColor: 'primary.main',
						position: 'absolute',
						left: 18,
						top: 18,
						bgcolor: '#fff',
						color: '#00000060',
						p: 1,
					}}
				>
					<Typography
						sx={{ fontSize: 12, fontWeight: 700, lineHeight: '10.8px' }}
					>
						URGENT
					</Typography>
					<Typography
						sx={{ fontSize: 9.5, fontWeight: 400, lineHeight: '8.55px' }}
					>
						Sell Product
					</Typography>
				</Box> */}
			</Box>

			<CardContent
				sx={{
					p: 0,
					pt: '8px',
					px: 1.5,
				}}
			>
				<Stack direction={'row'} spacing={1}>
					<Stack direction="row" spacing={0.5} alignItems={'center'}>
						<Chip
							sx={{
								bgcolor: 'primary.main',
								borderRadius: '3px',
								color: '#fff',
								fontSize: { xs: 10, sm: 12 },
								p: 0,
								height: 14,
								width: 20,
								'& span': {
									p: 0,
								},
							}}
							label="Ad"
						/>
						<Typography
							sx={{
								overflow: 'hidden',
								whiteSpace: 'nowrap',
								textOverflow: 'ellipsis',
								width: '10ch',
								fontSize: { xs: 15, sm: 15 },
								color: '#00000060',
							}}
						>
							Atif Muhammad
						</Typography>
						<VerifiedIcon sx={{ color: 'primary.main', fontSize: 16 }} />
					</Stack>
					<Typography sx={{ fontSize: { xs: 15, sm: 15 }, color: '#00000060' }}>
						14 people connected
					</Typography>
				</Stack>
				<Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
					<Stack direction="column">
						<Typography
							fontWeight={500}
							sx={{
								overflow: 'hidden',
								whiteSpace: { xs: 'wrap', sm: 'nowrap' },
								textOverflow: { xs: 'inherit', sm: 'ellipsis' },
								width: { xs: 'auto', sm: '34ch' },
								lineHeight: '20px',
								fontSize: { xs: 18, sm: 18 },
							}}
						>
							2 RHK Resident Apartment in Chandivali
						</Typography>
						<Stack direction={'row'} spacing={1.5}>
							<Typography
								fontWeight={500}
								fontSize={18}
								color="primary"
								sx={{
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									lineHeight: '20px',
									fontSize: { xs: 18, sm: 18 },
								}}
							>
								$ 2.85
							</Typography>
							<Typography
								fontWeight={500}
								fontSize={18}
								sx={{
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									lineHeight: '20px',
									fontSize: { xs: 18, sm: 18 },
									textDecorationLine: 'line-through',
								}}
							>
								$ 7.00
							</Typography>
							<Typography
								fontWeight={500}
								fontSize={18}
								sx={{
									color: 'success.main',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									lineHeight: '20px',
									fontSize: { xs: 18, sm: 18 },
									pl: 0.5,
								}}
							>
								20% off
							</Typography>
						</Stack>
					</Stack>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							variant="outlined"
							size="small"
							color="secondary"
							sx={{ width: 59, borderColor: '#00000060' }}
						>
							Details
						</Button>
					</Box>
				</Stack>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					sx={{ fontSize: { xs: 12, sm: 14 } }}
				>
					<Stack direction="row" spacing={1} alignItems="center">
						<Place sx={{ fontSize: { xs: 13, sm: 16 }, color: '#00000060' }} />
						<Typography
							variant="caption"
							sx={{ fontSize: { xs: 13, sm: 16 }, color: '#00000060' }}
						>
							Dhaka
						</Typography>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<Apps sx={{ fontSize: { xs: 13, sm: 16 }, color: '#00000060' }} />
						<Typography
							variant="caption"
							fontSize={16}
							sx={{ fontSize: { xs: 13, sm: 16 }, color: '#00000060' }}
						>
							Dhaka
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default OfferProductPremium;
