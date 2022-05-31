import CustomImage from '@app/atoms/CustomImage';
import { CheckCircle, Close } from '@mui/icons-material';
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';

const AdDialog = ({ data, open, close }) => {
	return (
		<Dialog open={open} onClose={close}>
			<DialogTitle sx={{ justifyContent: 'flex-end', display: 'flex' }}>
				<IconButton onClick={close}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Stack
					direction="column"
					justifyContent={'center'}
					alignItems="center"
					spacing={2}
				>
					<CheckCircle sx={{ color: 'success.main' }} />
					<Typography>Your ad is under review!</Typography>
					<Typography sx={{ px: 3 }}>
						Please note that it can take up to 3 hours for your ad to be
						published. Keep track of your ad through My Ads. We will contact you
						shortly if payment is required to publish your ad.
					</Typography>
				</Stack>
				<Box sx={{ p: 1, border: 1, my: 1 }}>
					<Stack direction="row" spacing={0.5}>
						<CustomImage
							src={data.photos[0]}
							height={75}
							width={120}
							alt={data.brand}
						/>
						<Stack sx={{ pl: 1 }} spacing={0.5}>
							<Typography
								fontWeight={'bold'}
							>{`${data.brand} ${data.model} (${data.condition})`}</Typography>
							<Typography
								sx={{ color: 'rgba(0,0,0,0.5)' }}
							>{`${data.location}, ${data.category}`}</Typography>
							<Typography
								sx={{ color: 'success.main' }}
							>{`Tk: ${data.price}`}</Typography>
						</Stack>
					</Stack>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default AdDialog;
