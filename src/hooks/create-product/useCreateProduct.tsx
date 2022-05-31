import React from 'react';
import useApi from '../use-swr/useApi';

const useCreateProduct = () => {
	const { data, isError, isLoading } = useApi({
		text: 'categories',
		url: '/categories',
	});
	return { categories: data, isLoading, isError };
};

export default useCreateProduct;
