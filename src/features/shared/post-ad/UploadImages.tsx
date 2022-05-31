import CustomImage from '@app/atoms/CustomImage';
import { RemoveCircle } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';

const UploadImages = ({ data, setData }) => {
	const [imgPlaceholderCount, setImgPlaceholderCount] = useState(5);
	const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files.length > 0) {
			const Reader = new FileReader();
			Reader.onload = (e) => {
				setData((prev) => {
					return {
						...prev,
						photos: [...prev.photos, e.target.result as string],
					};
				});
			};
			Reader.readAsDataURL(e.target.files[0]);
		}
	};
	const removeImage = (image: string) => {
		setData((prev) => {
			return {
				...prev,
				photos: [...prev.photos.filter((el) => el !== image)],
			};
		});
	};

	useEffect(() => {
		if (data.photos.length > 0) {
			setImgPlaceholderCount(5 - data.photos.length);
		}
	}, [data.photos]);

	return (
		<Fragment>
			<Box>
				<input
					accept=".jpg,.jpeg,.png"
					multiple
					id="input_image_upload"
					aria-label="Upload photos to ad"
					type="file"
					placeholder=""
					onChange={handleImageInput}
					hidden
				/>
			</Box>
			<Box
				sx={{
					py: 1,
					borderBottom: 0,
					overflowX: 'scroll',
				}}
			>
				<Stack
					direction="row"
					sx={{
						width: 'fit-content',
					}}
					alignItems="center"
					spacing={2}
				>
					{data.photos.length > 0 &&
						data.photos.map((photo, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: 100,
									height: 97,
									position: 'relative',
								}}
							>
								<CustomImage
									sx={{
										height: '100%',
										width: '100%',
										objectFit: 'contain',
									}}
									src={photo}
									alt={'image'}
								/>
								<IconButton
									onClick={() => removeImage(photo)}
									sx={{
										position: 'absolute',
										top: '-10px',
										right: '-10px',
										p: 0.1,
									}}
								>
									<RemoveCircle sx={{ color: 'error.main' }} />
								</IconButton>
							</Box>
						))}

					{new Array(imgPlaceholderCount).fill(null).map((el, index) => (
						<Box
							component="label"
							sx={{
								border: 1,
								borderColor: index === 0 ? 'primary.main' : 'text.disabled',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: 100,
								height: 97,
								color: index === 0 ? 'primary.main' : 'rgba(0,0,0,0.3)',
								cursor: index === 0 ? 'pointer' : 'default',
							}}
							key={index}
							htmlFor={index === 0 ? 'input_image_upload' : 'random'}
						>
							<Stack
								spacing={1}
								direction="column"
								justifyContent={'center'}
								alignItems="center"
								sx={{ width: '100%' }}
							>
								<ImageIcon />
								<Typography variant="caption">Add a photo</Typography>
							</Stack>
						</Box>
					))}
				</Stack>
			</Box>
		</Fragment>
	);
};

export default UploadImages;
