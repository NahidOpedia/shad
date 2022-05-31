import { Rows } from '@features/admin/all-products/types/productTableTypes';
import React from 'react';
import useApi from '../use-swr/useApi';

const useProductsTable = () => {
	const { data, isError, isLoading } = useApi({
		text: 'products',
		url: '/products',
	});
	if (isError) {
		return { products: data, isLoading, isError };
	}
	if (isLoading) {
		return { products: data, isLoading, isError };
	}
	const formatProduct: Rows[] = data.map((el): Rows => {
		return {
			category: el.category.title,
			click: el.click,
			description: el.description,
			editBy: 'Admin',
			id: 1,
			location: el.location.city,
			marchent: 'Samsung',
			postType: el.productType,
			price: el.price,
			productId: el._id,
			productPicture: el.photos,
			productStatus: el.productStatus,
			reach: el.reach,
			report: 'None',
			slots: '1/2 done',
			userType: 'Pro',
			verify: el.user.account.isVerified,
		};
	});

	return { products: formatProduct, isLoading, isError };
};

export default useProductsTable;
