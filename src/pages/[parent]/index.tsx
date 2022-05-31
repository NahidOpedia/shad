import Home from '@features/home/Home';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { Fragment, ReactNode } from 'react';
import useCategories from 'src/hooks/categories/useCategories';

interface ParentPageProps {
	children?: ReactNode;
	parent?: string;
}

const ParentPage: NextPage = (props: ParentPageProps) => {
	const { categories } = useCategories({
		parent: props.parent,
		text: props.parent,
	});
	console.log(categories, props.parent);
	return (
		<Fragment>
			<Head>
				<title>{props.parent} | Shadamon</title>
			</Head>
			{categories && <Home categories={[categories]} />}
		</Fragment>
	);
};
ParentPage.getInitialProps = async (context: NextPageContext) => {
	const { parent } = context.query;
	return { parent };
};
export default ParentPage;
