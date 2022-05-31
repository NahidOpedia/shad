import Admin from '@features/admin/Admin';
import { adminPages } from '@utils/dummyData';
import Head from 'next/head';
import { Fragment } from 'react';

const AdminPage = () => {
	return (
		<Fragment>
			<Head>
				<title>All Products - admin | Shadamon</title>
			</Head>
			<Admin page={'/admin/all-products'} />
		</Fragment>
	);
};
AdminPage.Layout = Fragment;
export default AdminPage;
