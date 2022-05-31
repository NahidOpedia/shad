import CustomImage from '@app/atoms/CustomImage';
import { Apps, Place } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
// import Moment from 'react-moment';

const OfferProductFree = ({ product }) => {
	return (
		<Stack
			direction="row"
			sx={{
				bgcolor: '#fff',
				border: 1,
				borderColor: 'text.disabled',
				borderRadius: '8px',
				width: { xs: 'min(100%, 500px)', sm: 500 },
				height: { xs: 'auto', sm: 108 },
				display: 'grid',
				gridTemplateColumns: '132px auto',
				gridAutoFlow: 'column',
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
					pl: '20px',
				}}
			>
				<Typography
					fontWeight={500}
					sx={{
						width: { xs: 'auto', sm: 260 },
						lineHeight: '16px',
						fontSize: { xs: 15 },
						color: 'success.main',
						pb: 0.5,
					}}
				>
					19% OFF
				</Typography>
				<Typography
					fontWeight={500}
					sx={{
						width: { xs: 'auto', sm: 260 },
						lineHeight: '16px',
						fontSize: { xs: 15 },
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
				<Stack
					direction={'row'}
					justifyContent="space-between"
					sx={{ width: '96%' }}
				>
					<Typography
						fontWeight={500}
						sx={{ lineHeight: '16px', fontSize: 15 }}
					>
						{`$ ${product.price}`}
					</Typography>
					<Typography
						component="div"
						// align="right"
						variant="caption"
						sx={{ lineHeight: 0.66 }}
					>
						Just now
						{/* <Moment fromNow interval={1000}>
						{product.createdAt}
					</Moment> */}
					</Typography>
				</Stack>
			</Box>
		</Stack>
	);
};

export default OfferProductFree;
