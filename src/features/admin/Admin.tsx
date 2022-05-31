import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { adminPages } from '@utils/dummyData';
import { Collapse, Stack } from '@mui/material';
import {
	ArrowDropUp,
	ArrowForward,
	ArrowLeft,
	ArrowRight,
	ChevronRight,
	ExpandLess,
	Notifications,
	NotificationsOutlined,
	PowerSettingsNew,
} from '@mui/icons-material';
import AllProducts from './all-products/AllProducts';
import CustomImage from '@app/atoms/CustomImage';
import CustomLink from '@app/atoms/CustomLink';

const drawerWidth = 214;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	width: `calc(100% - 65px)`,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': {
			backgroundColor: '#0a140f',

			...openedMixin(theme),
		},
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': {
			backgroundColor: '#0a140f',

			...closedMixin(theme),
		},
	}),
}));

const activeItem = {
	bgcolor: 'primary.main',
};
type props = {
	page: string;
};

export default function AdminPage({ page: currentPage }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [openPageChild, setOpenPageChild] = React.useState('');

	const handlePagesChild = (label: string) => {
		setOpenPageChild((prev) => {
			if (prev === label) {
				return '';
			}
			return label;
		});
	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerIcon = () => {
		setOpen(!open);
	};
	const HeaderAppBar = () => {
		return (
			<AppBar
				position="fixed"
				open={open}
				sx={{
					borderBottom: 1,
					borderColor: 'text.disabled',
					boxShadow: 0,
					bgcolor: '#fff',
				}}
			>
				<Toolbar sx={{ justifyContent: 'space-between', p: 1 }}>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ color: '#fff' }}
					>
						SHADAMON Admin Panel
					</Typography>
					<Stack direction="row" spacing={1}>
						<IconButton color="success">
							<NotificationsOutlined />
						</IconButton>
						<Stack direction="row" spacing={1}>
							<CustomImage
								src={'/assets/premium-cover-pic.jpg'}
								height={45}
								width={46}
								sx={{ borderRadius: '8px', objectFit: 'cover' }}
							/>
							<Stack direction="column" spacing={0.5}>
								<Typography variant="body2" fontWeight={'bold'}>
									Syed Mahbub
								</Typography>
								<Typography variant="caption">Admin</Typography>
							</Stack>
						</Stack>
						<IconButton>
							<PowerSettingsNew />
						</IconButton>
						<CustomLink href={'/'}>
							<IconButton>
								<ArrowForward />
							</IconButton>
						</CustomLink>
					</Stack>
					{/* <IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton> */}
				</Toolbar>
			</AppBar>
		);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					'& .MuiDrawer-paper, p, svg': {
						color: '#fff',
					},
				}}
			>
				<DrawerHeader sx={{ justifyContent: 'flex-start', height: 80 }}>
					<IconButton onClick={handleDrawerIcon}>
						{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
					<Typography sx={{ ml: '17px' }}>SHADAMON</Typography>
				</DrawerHeader>
				<Divider />
				<List>
					{adminPages.map((page, index) => (
						<ListItem
							key={page.label}
							disablePadding
							sx={{
								display: 'block',
								...(currentPage === page.link && activeItem),
							}}
						>
							<ListItemButton
								component={!page.child ? 'a' : 'div'}
								href={page.child ? '#' : page.link}
								onClick={() => handlePagesChild(page.label)}
								sx={{
									justifyContent: open ? 'initial' : 'center',
									p: 0,
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText
									primary={page.label}
									sx={{ opacity: open ? 1 : 0, m: 0 }}
								/>
								{open && page.child && openPageChild === page.label && (
									<ArrowDropUp />
								)}
								{open && page.child && openPageChild !== page.label && (
									<ArrowRight />
								)}
							</ListItemButton>
							{page.child && (
								<Collapse in={openPageChild === page.label} sx={{ ml: '36px' }}>
									{page.child.map((child) => (
										<ListItemButton
											LinkComponent={'a'}
											href={page.link}
											key={child.label}
											sx={{ p: 0, pt: 0.5 }}
										>
											<ListItemIcon></ListItemIcon>
											<ListItemText>{child.label}</ListItemText>
										</ListItemButton>
									))}
								</Collapse>
							)}
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box
				sx={{
					width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 65px)`,
					height: '100%',
					px: 1,
					bgcolor: '#fff',
				}}
			>
				{currentPage === '/admin/all-products' && (
					<>
						<HeaderAppBar />
						<DrawerHeader />
						<AllProducts />
					</>
				)}
				{currentPage === 'admin' && (
					<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
						{/* <DrawerHeader /> */}
						<Typography paragraph>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
							Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
							gravida rutrum quisque non tellus. Convallis convallis tellus id
							interdum velit laoreet id donec ultrices. Odio morbi quis commodo
							odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
							est ultricies integer quis. Cursus euismod quis viverra nibh cras.
							Metus vulputate eu scelerisque felis imperdiet proin fermentum
							leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
							lobortis feugiat vivamus at augue. At augue eget arcu dictum
							varius duis at consectetur lorem. Velit sed ullamcorper morbi
							tincidunt. Lorem donec massa sapien faucibus et molestie ac.
						</Typography>
						<Typography paragraph>
							Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
							ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
							elementum integer enim neque volutpat ac tincidunt. Ornare
							suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
							volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
							Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
							ornare massa eget egestas purus viverra accumsan in. In hendrerit
							gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
							aliquam sem et tortor. Habitant morbi tristique senectus et.
							Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
							aenean euismod elementum nisi quis eleifend. Commodo viverra
							maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
							aliquam ultrices sagittis orci a.
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
}
