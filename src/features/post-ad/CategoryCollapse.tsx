import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Box,
	Collapse,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { Fragment } from 'react';

import CustomImage from '@app/atoms/CustomImage';

const CategoryCollapse = ({
	openCategories,
	categories,
	handleOpenChild,
	openChild,
	handlePostCategory,
}) => {
	return (
		<Collapse
			in={openCategories === categories.parent}
			sx={{ pl: '43px' }}
			timeout="auto"
		>
			{categories.categories.length > 0 &&
				categories.categories.map((firstChild) => (
					<Fragment key={firstChild.category._id}>
						<ListItemButton
							sx={{ borderBottom: 1, borderColor: 'text.disabled', p: 0 }}
							onClick={() => handleOpenChild(firstChild.category._id)}
						>
							<ListItemIcon>
								{firstChild.category.icon ? (
									<Fragment>
										<CustomImage
											src={firstChild.category.icon}
											height={20}
											width={20}
										/>
									</Fragment>
								) : (
									<div></div>
								)}
							</ListItemIcon>
							<ListItemText>
								{firstChild.category.title}
								<Typography
									component={'span'}
									sx={{ color: 'grey.600', ml: 0.5 }}
								>
									({firstChild.child?.subCategories?.length || 0})
								</Typography>
							</ListItemText>
							{openChild === firstChild.category._id && <ExpandLess />}
							{openChild !== firstChild.category._id && <ExpandMore />}
						</ListItemButton>
						{firstChild.child.subCategories &&
							firstChild.child.subCategories.length > 0 && (
								<Collapse
									in={openChild === firstChild.category._id}
									timeout="auto"
								>
									{firstChild.child.subCategories.map((secondChild) => (
										<Fragment key={secondChild.cat._id}>
											<ListItemButton
												sx={{
													p: 0,
													ml: '30px',
													borderBottom: 1,
													borderColor: 'text.disabled',
												}}
												onClick={() =>
													handlePostCategory({
														parent: categories.parent,
														category: firstChild.category,
														subCategory: secondChild.cat,
													})
												}
											>
												<ListItemIcon sx={{ minWidth: 22 }}>
													<Box
														component="span"
														sx={{
															height: 8,
															width: 8,
															bgcolor: 'rgba(0, 0, 0, 0.376)',
															borderRadius: '50%',
														}}
													></Box>
												</ListItemIcon>
												<ListItemText
													sx={
														{
															// color: secondChild.child ? 'text.primary' : '#0000ffd4',
														}
													}
												>
													{secondChild.cat.title}
													<Typography
														component={'span'}
														sx={{ color: 'grey.600', ml: 0.5 }}
													>
														({secondChild.products.length})
													</Typography>
												</ListItemText>
											</ListItemButton>
										</Fragment>
									))}
								</Collapse>
							)}
					</Fragment>
				))}
		</Collapse>
	);
};

export default CategoryCollapse;
