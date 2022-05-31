import { Apps, Place, Search } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

const iconButtonSx = {
	p: 0,
	color: 'text.primary',
	fontWeight: 400,
};

const SubHeader = () => {
	const [topPixel, setTopPixel] = useState('0px');
	useEffect(() => {
		if (window) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > 100) {
					setTopPixel('50px');
				}
			});
		}
	});
	return (
		<Box
			sx={{
				position: { xs: 'sticky', sm: 'static' },
				bgcolor: '#fff',
				p: 1,
				borderBottomLeftRadius: '8px',
				borderBottomRightRadius: '8px',
				height: 38,
				width: '100%',
				top: topPixel,
				zIndex: 3,
			}}
		>
			<Stack
				direction="row"
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
					px: 1,
				}}
			>
				<Button sx={{ ...iconButtonSx }} startIcon={<Apps />}>
					Categories
				</Button>
				<Button sx={{ ...iconButtonSx }} startIcon={<Place />}>
					Location
				</Button>
				<Button sx={{ ...iconButtonSx }} endIcon={<Search />}>
					Search
				</Button>
			</Stack>
		</Box>
	);
};

export default SubHeader;
