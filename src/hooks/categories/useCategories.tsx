import React from 'react';
import useApi from '../use-swr/useApi';

interface CategoriesProps {
	slug?: string;
	parent?: string;
	text: string | (() => boolean | null);
}

const useCategories = ({ slug, parent, text }: CategoriesProps) => {
	const { data, isError, isLoading } = useApi({
		text,
		url: `/categories?parent=${parent}&slug=${slug}`,
		revalidate: {
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	});

	return { categories: data, isError, isLoading };
};

export default useCategories;
