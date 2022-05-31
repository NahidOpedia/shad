import Admin from '@features/admin/Admin';
import Head from 'next/head';
import { Fragment } from 'react';

const AdminPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Admin | Shadamon</title>
			</Head>
			<Admin page={'admin'} />
		</Fragment>
	);
};
AdminPage.Layout = Fragment;
export default AdminPage;
