import {
	Box,
	Checkbox,
	Collapse,
	Divider,
	FormControlLabel,
	FormGroup,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import React, {
	Fragment,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	ArrowForward,
	ArrowForwardIos,
	ChevronRight,
	ExpandLess,
	ExpandMore,
} from '@mui/icons-material';
import { categories, locations } from '@utils/dummyData';
import { useRouter } from 'next/router';
import { AuthContext } from '@app/global-context/AuthContext';

import CustomImage from '@app/atoms/CustomImage';
import CustomLink from '@app/atoms/CustomLink';

const LefColumn = ({ categories: categoryParents }) => {
	const [openChild, setOpenChild] = useState('Sell');
	const [openNestedChild, setOpenNestedChild] = useState('');
	const [openSorting, setOpenSorting] = useState(true);
	const [openCategories, setOpenCategories] = useState(true);
	const [openLocation, setOpenLocation] = useState(true);
	const [openLocChild, setOpenLocChild] = useState('All of Bangladesh');
	const [openLocNestedChild, setOpenLocNestedChild] = useState('');
	const { user } = useContext(AuthContext);
	const router = useRouter();
	const { query } = router;

	const handleOpenLocChild = (label: string) => {
		setOpenLocChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	const handleOpenLocNestedChild = (label: string) => {
		setOpenLocNestedChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	const handleOpenNestedChild = (label: string) => {
		setOpenNestedChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	const handleOpenChild = (label: string) => {
		setOpenChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};

	useEffect(() => {
		if (query.cat) {
			setOpenChild(query.cat as string);
		}
	}, [query]);
	return (
		<Box
			className="scrollbar-hidden"
			sx={{
				width: 250,
				height: '100vh',
				position: 'fixed',
				pt: '50px',
				overflowX: 'hidden',
				overflowY: 'scroll',
				pb: user ? 12 : 8,
			}}
		>
			<List
				sx={{
					'& li, span, label, p, svg, div': { my: 0, pl: 0, fontSize: 15 },
					pt: 0,
				}}
			>
				<ListItem sx={{ py: 0 }}>
					<ListItemIcon>
						<FavoriteIcon color="primary" />
					</ListItemIcon>
					<ListItemText sx={{ color: 'primary.main' }}>For You</ListItemText>
				</ListItem>
				<ListItemButton
					sx={{ p: 0.5, pb: 0 }}
					onClick={() => setOpenSorting(!openSorting)}
				>
					<ListItemText sx={{ pl: 1 }}>Sorting</ListItemText>
					{!openSorting && <ChevronRight />}
					{openSorting && <ExpandLess />}
				</ListItemButton>
				<Collapse in={openSorting} timeout="auto">
					<ListItem
						sx={{
							pl: '4px!important',
							pb: 0,
							'& span.MuiCheckbox-root': { p: 0.3 },
						}}
					>
						<FormGroup sx={{ pl: '8px!important' }}>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Urgent"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Cheap Rate"
							/>
							<FormControlLabel
								control={<Checkbox size="small" />}
								label="Home Delivery"
							/>
						</FormGroup>
					</ListItem>
					<ListItem sx={{ p: 0, pb: 0.5 }}>
						<ListItemIcon></ListItemIcon>
						<ListItemText sx={{ color: 'primary.main', m: 0, fontSize: 12 }}>
							See More
						</ListItemText>
					</ListItem>
				</Collapse>
				<Divider />
				<ListItemButton
					sx={{ p: 0, pt: 0.5 }}
					onClick={() => setOpenCategories(!openCategories)}
				>
					<ListItemText sx={{ pl: 1 }}>All Categories</ListItemText>
					{openCategories && <ExpandLess />}
					{!openCategories && <ChevronRight />}
				</ListItemButton>
				<Collapse in={openCategories} timeout="auto">
					{categoryParents &&
						categoryParents.map((parent) => (
							<Fragment key={parent.parent}>
								<CustomLink
									sx={{ color: 'text.primary' }}
									href={`/${parent.parent.toString().toLowerCase()}`}
								>
									<ListItemButton
										sx={{ p: 0, pt: 0.5 }}
										onClick={() => handleOpenChild(parent.parent)}
									>
										<ListItemIcon></ListItemIcon>
										<ListItemText>{parent.parent}</ListItemText>
										{openChild === parent.parent && <ExpandLess />}
										{openChild !== parent.parent && <ChevronRight />}
									</ListItemButton>
								</CustomLink>
								{parent.categories.length > 0 && (
									<Collapse in={openChild === parent.parent} timeout="auto">
										{parent.categories.map((category) => (
											<Fragment key={category.category._id}>
												<CustomLink
													href={`/${parent.parent.toString().toLowerCase()}/${
														category.category.slug
													}`}
												>
													<ListItemButton
														sx={{ p: 0, pt: 0.5 }}
														onClick={() =>
															handleOpenNestedChild(category.category._id)
														}
													>
														<ListItemIcon>
															{/* <child.icon /> */}
															{category.category.icon ? (
																<CustomImage
																	src={category.category.icon}
																	height={20}
																	width={20}
																/>
															) : (
																<></>
															)}
															{/* <svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															className="bi bi-house-door"
															viewBox="0 0 16 16"
														>
															<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
														</svg> */}
														</ListItemIcon>
														<ListItemText
															sx={{
																color:
																	openNestedChild === category.category._id
																		? 'text.primary'
																		: '#0000ffd4',
															}}
														>
															{category.category.title}
															<Typography
																component={'span'}
																sx={{ color: 'grey.600', ml: 0.5 }}
															>
																({category.child.subCategories?.length || 0})
															</Typography>
														</ListItemText>
													</ListItemButton>
												</CustomLink>
												{category.child?.subCategories &&
													category.child?.subCategories.length > 0 && (
														<Collapse
															in={openNestedChild === category.category._id}
															timeout="auto"
														>
															{category.child.subCategories.map((el) => (
																<ListItem
																	key={el.cat._id}
																	sx={{ ml: 5, px: 0 }}
																>
																	<ListItemIcon sx={{ minWidth: 20 }}>
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
																	<ListItemText sx={{ color: '#0000ffd4' }}>
																		{el.cat.title}
																		<Typography
																			component={'span'}
																			sx={{ color: 'grey.600', ml: 0.5 }}
																		>
																			({el.products.length})
																		</Typography>
																	</ListItemText>
																</ListItem>
															))}
														</Collapse>
													)}
											</Fragment>
										))}
									</Collapse>
								)}
							</Fragment>
						))}
					<ListItem sx={{ p: 0, pb: 0.5 }}>
						<ListItemIcon></ListItemIcon>
						<ListItemText sx={{ color: 'primary.main', m: 0 }}>
							See More
						</ListItemText>
					</ListItem>
				</Collapse>

				<Divider />
				<ListItemButton
					onClick={() => setOpenLocation(!openLocation)}
					sx={{ p: 0, pt: 0.5 }}
				>
					<ListItemText sx={{ pl: 1 }}>Locations</ListItemText>
					{!openLocation && <ChevronRight />}
					{openLocation && <ExpandLess />}
				</ListItemButton>
				<Collapse in={openLocation} timeout="auto">
					{locations.map((location) => (
						<Fragment key={location.label}>
							<ListItemButton
								sx={{ p: 0, pt: 0.5 }}
								onClick={() => handleOpenLocChild(location.label)}
							>
								<ListItemIcon></ListItemIcon>
								<ListItemText>{location.label}</ListItemText>
								{openLocChild === location.label && <ExpandLess />}
								{openLocChild !== location.label && <ChevronRight />}
							</ListItemButton>
							{location.child && (
								<Collapse in={openLocChild === location.label} timeout="auto">
									{location.child.map((childLoc) => (
										<Fragment key={childLoc.label}>
											<ListItemButton
												sx={{ p: 0, pt: 0.5 }}
												onClick={() => handleOpenLocNestedChild(childLoc.label)}
											>
												<ListItemText sx={{ color: '#0000ffd4' }}>
													{childLoc.label}
													<Typography
														component={'span'}
														sx={{ color: 'grey.600', ml: 0.5 }}
													>
														({childLoc.child?.length || 0})
													</Typography>
												</ListItemText>
											</ListItemButton>
											{childLoc.child && (
												<Collapse
													in={openLocNestedChild === childLoc.label}
													timeout="auto"
												>
													{childLoc.child.map((el) => (
														<ListItem key={el.label} sx={{ ml: 5, px: 0 }}>
															<ListItemIcon sx={{ minWidth: 20 }}>
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
															<ListItemText>
																{el.label}
																<Typography
																	component={'span'}
																	sx={{ color: 'grey.600', ml: 0.5 }}
																>
																	({el.count})
																</Typography>
															</ListItemText>
														</ListItem>
													))}
												</Collapse>
											)}
										</Fragment>
									))}
								</Collapse>
							)}
						</Fragment>
					))}
					<ListItem sx={{ p: 0, pb: 0.5 }}>
						<ListItemIcon></ListItemIcon>
						<ListItemText sx={{ color: 'primary.main', m: 0 }}>
							See More
						</ListItemText>
					</ListItem>
				</Collapse>

				<Divider />
			</List>
		</Box>
	);
};

export default LefColumn;
