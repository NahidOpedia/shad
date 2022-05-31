import OfferProductPremium from '@features/product/premium/OfferProductPremium';
import PremiumProduct from '@features/product/premium/PremiumProduct';
import { Box, Stack } from '@mui/material';
import React from 'react';
import useFreeProducts from 'src/hooks/free-product/useFreeProducts';
import FreeProducts from './free-products/FreeProducts';
import LefColumn from './LefColumn';
import RightColumn from './RightColumn';
import SubHeader from './SubHeader';

const Home = ({ categories }) => {
	const { products, isError, isLoading } = useFreeProducts();

	return (
		<Stack
			direction="row"
			spacing={{ xs: 0, md: '50px' }}
			sx={{
				minHeight: '100vh',
				pt: 0,
				justifyContent: { sm: 'center', lg: 'flex-start' },
			}}
		>
			<Box
				sx={{
					width: 250,
					height: '100vh',
					position: 'relative',
					display: { xs: 'none', lg: 'block' },
				}}
			>
				<LefColumn categories={categories} />
			</Box>
			<Box
				sx={{
					width: { xs: '100%', sm: 500 },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					rowGap: 1.3,
				}}
			>
				<SubHeader />
				<PremiumProduct />
				<FreeProducts
					products={
						products
							? products.map((el, i) => i < 3 && el).filter((el) => el && el)
							: null
					}
					isLoading={isLoading}
					isError={isError}
				/>
				<OfferProductPremium />
				<FreeProducts
					products={
						products
							? products.map((el, i) => i > 3 && el).filter((el) => el && el)
							: null
					}
					isLoading={isLoading}
					isError={isError}
				/>
			</Box>
			<Box
				sx={{
					width: 160,
					height: '100vh',
					position: 'relative',
					display: { xs: 'none', lg: 'block' },
				}}
			>
				<RightColumn />
			</Box>
		</Stack>
	);
};

export default Home;
