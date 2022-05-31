import CustomImage from '@app/atoms/CustomImage';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const RightColumn = () => {
	const [topPadding, setTopPadding] = useState(7.5);
	useEffect(() => {
		if (window) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > window.innerHeight / 7) {
					setTopPadding(0.5);
				} else {
					setTopPadding(7.5);
				}
				// if (window.scrollY > 100) {
				// }
				// if (window.scrollY < 100) {
				// 	setTopPadding((prev) => {
				// 		return 7.5;
				// 	});
				// }
			});
		}
	});
	return (
		<Box
			sx={{
				width: 160,
				height: '100vh',
				position: 'fixed',
				py: 1,
				pt: topPadding,
				transition: 'all 0.9s ease',
			}}
		>
			<CustomImage src={'/assets/left-ad-banner.jpg'} />
		</Box>
	);
};

export default RightColumn;
