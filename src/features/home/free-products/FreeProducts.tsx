import BidProductFree from '@features/product/free/BidProductFree';
import FreeProductCard from '@features/product/free/FreeProductCard';
import OfferProductFree from '@features/product/free/OfferProductFree';
import React, { Fragment } from 'react';
import useFreeProducts from 'src/hooks/free-product/useFreeProducts';

const FreeProducts = ({ isLoading, isError, products }) => {
	if (isLoading) {
		return <div>Loading free products...</div>;
	}
	if (isError) return <div>Error in loading free products</div>;
	return (
		<Fragment>
			{products[0] && <FreeProductCard product={products[0]} />}
			{products[2] && <OfferProductFree product={products[2]} />}
			{products[1] && <BidProductFree product={products[1]} />}
		</Fragment>
	);
};

export default FreeProducts;
