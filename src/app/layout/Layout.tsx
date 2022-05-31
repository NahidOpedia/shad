import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Container, Stack } from '@mui/material';
import Header from '@features/header/Header';
import { AuthContext } from '@app/global-context/AuthContext';
const Layout = ({ children }) => {
	const { user } = useContext(AuthContext);
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				overflow: 'visible',
			}}
		>
			<Header />
			<Box
				sx={{
					width: { xs: '100%', md: 1025 },
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
