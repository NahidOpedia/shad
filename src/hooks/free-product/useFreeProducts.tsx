import React from 'react';
import useApi from '../use-swr/useApi';

const useFreeProducts = () => {
	const { data, isError, isLoading } = useApi({
		text: 'free-products',
		url: '/products?t=free',
	});

	return { products: data, isError, isLoading };
};

export default useFreeProducts;
