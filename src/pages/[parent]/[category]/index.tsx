import Home from '@features/home/Home';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { Fragment, ReactNode } from 'react';
import useCategories from 'src/hooks/categories/useCategories';

interface CategoryPageProps {
	children?: ReactNode;
	parent?: string;
	category?: string;
}
const CategoryPage: NextPage = (props: CategoryPageProps) => {
	const { categories } = useCategories({
		parent: props.parent,
		slug: props.category,
		text: props.category,
	});
	console.log(props, categories);
	return (
		<Fragment>
			<Head>
				<title>{props.category} | Shadamon</title>
			</Head>
			{categories && <Home categories={[categories]} />}
		</Fragment>
	);
};
CategoryPage.getInitialProps = async (context: NextPageContext) => {
	const { parent, category } = context.query;
	return { parent, category };
};
export default CategoryPage;
