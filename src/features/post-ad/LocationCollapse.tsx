import { ArrowBack, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { locations } from '@utils/dummyData';
import { getLocalItem, setLocalItem } from '@utils/localStorage';
import React, { Fragment, useEffect, useState } from 'react';
import { PageState } from './PostAdDialog';

const LocationCollapse = ({ handleLocation, handlePageState }) => {
	const [openChild, setOpenChild] = useState(
		getLocalItem('openLocChild') || ''
	);
	const handleOpenChild = (label: string) => {
		setOpenChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	useEffect(() => {
		setLocalItem('openLocChild', openChild);
	}, [openChild]);

	return (
		<Fragment>
			<IconButton
				onClick={() => handlePageState(PageState.catPage)}
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
					pt: 5,
					px: { xs: 2 },
					pb: 4,
					justifyContent: 'start',
					alignItems: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
					Select Your Location
				</Typography>
				<List
					sx={{
						width: '100%',
						px: 1,
					}}
				>
					<Collapse in={true} timeout="auto">
						{locations[0].child.map((firstChild) => (
							<Fragment key={firstChild.label}>
								<ListItemButton
									sx={{ p: 0.1, borderBottom: 1, borderColor: 'text.disabled' }}
									onClick={() => handleOpenChild(firstChild.label)}
								>
									<ListItemText sx={{ pl: 1 }}>{firstChild.label}</ListItemText>

									{openChild !== firstChild.label && <ExpandMore />}
									{openChild === firstChild.label && <ExpandLess />}
								</ListItemButton>

								{firstChild.child && (
									<Collapse
										in={openChild === firstChild.label}
										sx={{ pl: '43px' }}
										timeout="auto"
									>
										{firstChild.child.map((childLoc) => (
											<Fragment key={childLoc.label}>
												<ListItemButton
													sx={{
														borderBottom: 1,
														borderColor: 'text.disabled',
														p: 0,
													}}
													onClick={() =>
														handleLocation({
															city: firstChild.label,
															district: childLoc.label,
														})
													}
												>
													<ListItemText sx={{ color: '#0000ffd4' }}>
														{childLoc.label}
														<Typography
															component={'span'}
															sx={{ color: 'grey.600', ml: 0.5 }}
														>
															({childLoc.count})
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
				</List>
			</Stack>
		</Fragment>
	);
};

export default LocationCollapse;
