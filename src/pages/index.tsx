import Home from '@features/home/Home';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useContext, useState } from 'react';
import useCategories from 'src/hooks/categories/useCategories';

const IndexPage: NextPage = () => {
	const { categories, isError, isLoading } = useCategories({
		parent: 'all',
		text: 'allCategories',
	});
	console.log(categories);
	return (
		<Fragment>
			<Head>
				<title>Shadamon</title>
			</Head>
			<Home categories={categories} />
		</Fragment>
	);
};

export default IndexPage;
