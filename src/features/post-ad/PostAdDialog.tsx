import { AuthContext } from '@app/global-context/AuthContext';
import { Box } from '@mui/material';

import React, { Fragment, useContext, useEffect, useState } from 'react';
import LocationCollapse from './LocationCollapse';

import PostAdCategories from './PostAdCategories';
import PostAdForm from './PostAdForm';

export enum PageState {
	catPage = 'CATEGORY_PAGE',
	locPage = 'LOCATION_PAGE',
	formPage = 'FORM_PAGE',
}
export type Location = {
	city: string;
	district: string;
};
export type Category = {
	parent: string;
	category: { _id: string; title: string };
	subCategory: { _id: string; title: string };
};

const PostAdDialog = ({ handleClose }) => {
	const { user } = useContext(AuthContext);
	const [pageState, setPageState] = useState<PageState>(PageState.catPage);
	const [postCategory, setPostCategory] = useState<Category | null>(null);
	const [location, setLocation] = useState<Location | null>(null);
	const handlePostCategory = (props: Category) => {
		setPostCategory(props);
	};
	const handleLocation = (props: Location) => {
		setLocation(props);
	};
	const handlePageState = (props: PageState) => {
		setPageState(props);
	};
	// console.log(postCategory, location);

	useEffect(() => {
		if (postCategory) {
			if (location) {
				return setPageState(PageState.formPage);
			}
			return setPageState(PageState.locPage);
		}
		return () => setPageState(PageState.catPage);
	}, [postCategory, location]);
	return (
		<Fragment>
			{pageState === PageState.catPage && (
				<PostAdCategories
					handleClose={handleClose}
					handlePostCategory={handlePostCategory}
				/>
			)}
			{pageState === PageState.locPage && (
				<LocationCollapse
					handleLocation={handleLocation}
					handlePageState={handlePageState}
				/>
			)}
			{pageState === PageState.formPage && (
				<Box sx={{ px: 2, width: '100%' }}>
					<PostAdForm
						location={location}
						category={postCategory}
						handlePageState={handlePageState}
					/>
				</Box>
			)}
		</Fragment>
	);
};

export default PostAdDialog;
