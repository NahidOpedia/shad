import CustomImage from '@app/atoms/CustomImage';
import { AuthContext } from '@app/global-context/AuthContext';
import { ArrowBack, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { getLocalItem, setLocalItem } from '@utils/localStorage';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import useCategories from 'src/hooks/categories/useCategories';
import CategoryCollapse from './CategoryCollapse';

const PostAdCategories = ({ handlePostCategory, handleClose }) => {
	const { user } = useContext(AuthContext);
	const {
		categories: categoryParents,
		isError,
		isLoading,
	} = useCategories({
		text: 'allCategories',
		parent: 'all',
	});
	const [openChild, setOpenChild] = useState(
		getLocalItem('openChildShadamon') || 'Sell'
	);
	const [openCategories, setOpenCategories] = useState(
		getLocalItem('openCategoriesShadamon') || ''
	);
	const handleOpenChild = (label: string) => {
		setOpenChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	const handleOpenCategories = (props: string) => {
		setOpenCategories((prev) => {
			if (prev === props) {
				return '';
			}
			return props;
		});
	};
	const findCategory = (name: string) => {
		return categoryParents.find((parent) => parent.parent === name);
	};
	useEffect(() => {
		setLocalItem('openChildShadamon', openChild);
		setLocalItem('openCategoriesShadamon', openCategories);
	}, [openChild, openCategories]);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Failed to load categories...</div>;
	}

	return (
		<Fragment>
			<IconButton
				onClick={() => handleClose()}
				aria-label="close"
				sx={{
					color: '#00000060',
					bgcolor: '#e4e4e4',
					position: 'absolute',
					left: 12,
					top: 10,
					'&:hover': {
						bgcolor: '#e4e4e4',
					},
				}}
			>
				<ArrowBack />
			</IconButton>
			<Stack
				direction="column"
				spacing={1}
				sx={{
					pt: 4,
					px: { xs: 2 },
					pb: 0,
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: 'fit-content',
				}}
			>
				<CustomImage src={'/assets/post-ad.png'} height={110} width={104} />
				<Stack
					direction="column"
					spacing={0.2}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="caption" sx={{ color: 'grey.500' }}>
						{`Welcome ${user.name}`}
					</Typography>
					<Typography sx={{ fontSize: 18, mt: '0px!important' }}>
						Let&apos;s Add Your Post
					</Typography>
					<Typography
						variant="caption"
						sx={{ mt: '0px!important', color: 'grey.500' }}
					>
						Choose your option below
					</Typography>
				</Stack>
				<List
					sx={{
						'& span, label, p, svg': { my: 0, pl: 0, fontSize: 17 },
						width: '100%',
						px: 1,
					}}
				>
					{}
					<ListItemButton
						sx={{ p: 0.5, borderBottom: 1, borderColor: 'text.disabled' }}
						onClick={() => handleOpenCategories('Sell')}
					>
						<ListItemText sx={{ pl: 1 }}>
							<b>Sell</b> Anything
						</ListItemText>
						{openCategories === 'Sell' && <ExpandLess />}
						{openCategories !== 'Sell' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Sell')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
					{/* <Divider /> */}
					<ListItemButton
						sx={{ p: 0.5 }}
						onClick={() => handleOpenCategories('Rent')}
					>
						<ListItemText sx={{ pl: 1 }}>
							<b>Rent</b> Anything
						</ListItemText>
						{openCategories === 'Rent' && <ExpandLess />}
						{openCategories !== 'Rent' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Rent')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
					<Divider />
					<ListItemButton
						sx={{ p: 0.5 }}
						onClick={() => handleOpenCategories('Job')}
					>
						<ListItemText sx={{ pl: 1 }}>
							Post a <b>Job</b>
						</ListItemText>
						{openCategories === 'Job' && <ExpandLess />}
						{openCategories !== 'Job' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Job')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
					<Divider />
					<ListItemButton
						sx={{ p: 0.5 }}
						onClick={() => handleOpenCategories('Bid')}
					>
						<ListItemText sx={{ pl: 1 }}>
							Create a <b>Bid</b>
						</ListItemText>
						{openCategories === 'Bid' && <ExpandLess />}
						{openCategories !== 'Bid' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Bid')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
					<Divider />
					<ListItemButton
						sx={{ p: 0.5 }}
						onClick={() => handleOpenCategories('Offer')}
					>
						<ListItemText sx={{ pl: 1 }}>
							Create a <b>Offer</b>
						</ListItemText>
						{openCategories === 'Offer' && <ExpandLess />}
						{openCategories !== 'Offer' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Offer')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
					<Divider />
					<ListItemButton
						sx={{ p: 0.5 }}
						onClick={() => handleOpenCategories('Buy')}
					>
						<ListItemText sx={{ pl: 1 }}>
							Loook Something to <b>Buy</b>
						</ListItemText>
						{openCategories === 'Buy' && <ExpandLess />}
						{openCategories !== 'Buy' && <ExpandMore />}
					</ListItemButton>
					<CategoryCollapse
						handlePostCategory={handlePostCategory}
						categories={findCategory('Buy')}
						handleOpenChild={handleOpenChild}
						openCategories={openCategories}
						openChild={openChild}
					/>
				</List>
				<Stack
					direction="row"
					divider={
						<Box
							component="span"
							sx={{
								height: 8,
								width: 8,
								bgcolor: 'rgba(0, 0, 0, 0.376)',
								borderRadius: '50%',
							}}
						></Box>
					}
					spacing={1}
					sx={{
						justifySelf: 'end',
						mt: '50px!important',
						pb: 2,
						flexWrap: 'wrap',
						alignItems: 'center',
						color: 'rgba(0, 0, 0, 0.376)',
					}}
				>
					<Typography variant="caption">Posting rules</Typography>
					<Typography variant="caption">Posting Allowance</Typography>
					<Typography variant="caption">Help Line</Typography>
					<Typography variant="caption">Help Chat</Typography>
				</Stack>
			</Stack>
		</Fragment>
	);
};

export default PostAdCategories;
