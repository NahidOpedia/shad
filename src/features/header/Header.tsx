import React, { Fragment, useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
	Badge,
	Chip,
	DialogContent,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { Email, Redeem } from '@mui/icons-material';
import CustomLink from '@app/atoms/CustomLink';
import CustomImage from '@app/atoms/CustomImage';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CustomDialog from '@app/atoms/CustomDialog';
import Authentication from '@features/authentication/Authentication';
import { signOut, useSession } from 'next-auth/react';
import { AuthContext } from '@app/global-context/AuthContext';
import { DialogId } from '@app/types/dialog.types';
import PostAdDialog from '@features/post-ad/PostAdDialog';

const tabsSx = {
	height: 'auto',
	p: 0,
	fontSize: 18,
	lineHeight: '27px',
	fontWeight: 700,
	borderRadius: 0,
	color: 'text.primary',
	position: 'relative',
};

const leftIconsSx = {
	height: 28,
	width: 28,
	borderRadius: '50%',
	fontSize: 14,
	fontWeigth: 400,
	p: 0,
	bgcolor: '#efefef',
	'&:active, &:focus': {
		border: 1,
		borderColor: 'primary.main',
	},
};
const mobileLeftIconsSx = {
	display: {
		md: 'none',
	},
};

const chipSx = {
	fontSize: 13,
	borderRadius: 1,
	// height: 25,
	p: 1,
	'& span': {
		px: 1,
	},
};

const Header = () => {
	const { data: session } = useSession();
	const { user } = useContext(AuthContext);
	const [openDialog, setOpenDialog] = useState('');
	const [tab, setTab] = useState('allAds');
	const activeSx = (tabName: string, name: string) => {
		return tabName === name
			? {
					'&::after': {
						content: `""`,
						position: 'absolute',
						bottom: '-9px',
						left: '-10%',
						width: '120%',
						height: '4px',
						bgcolor: 'primary.main',
					},
			  }
			: { color: '#00000060' };
	};
	const handleTabClick = (props: string) => (event) => {
		setTab(props);
	};
	// console.log(user, session);
	return (
		<Fragment>
			<AppBar
				position="sticky"
				sx={{
					borderRadius: 0,
					bgcolor: '#fff',
					boxShadow: 0,
					borderBottom: { xs: 0, md: 1 },
					borderColor: { md: 'text.disabled' },
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					minHeight: 40,
					height: 50,
				}}
			>
				<Toolbar
					sx={{
						justifyContent: { xs: 'space-between', md: 'flex-start' },
						p: 0,
						height: 33,
						px: { xs: 1, md: '0px!important' },
						width: { xs: '100%', sm: 500, lg: 1025 },
					}}
				>
					<CustomLink href={'/'} sx={{ width: { md: 260 } }}>
						<CustomImage src="/assets/shadamon-logo.png" width={132} />
					</CustomLink>

					<Stack
						direction="row"
						spacing={2}
						alignItems="end"
						sx={{
							width: 500,
							height: '100%',
							pl: '45px',
							display: { xs: 'none', md: 'flex' },
						}}
					>
						<IconButton
							onClick={handleTabClick('allAds')}
							sx={{
								...tabsSx,
								...activeSx(tab, 'allAds'),
							}}
						>
							All Ads
						</IconButton>
						<IconButton
							onClick={handleTabClick('loan')}
							sx={{ ...tabsSx, ...activeSx(tab, 'loan') }}
						>
							Loan
						</IconButton>
						<IconButton
							onClick={handleTabClick('offer')}
							sx={{ ...tabsSx, ...activeSx(tab, 'offer') }}
						>
							Offer
						</IconButton>
						<IconButton
							onClick={handleTabClick('bid')}
							sx={{ ...tabsSx, ...activeSx(tab, 'bid') }}
						>
							Bid
						</IconButton>
					</Stack>
					<Stack
						direction="row"
						spacing={1.5}
						sx={{
							width: { md: 210 },
							ml: { xs: 0, sm: '37px' },
							pr: { xs: 1, sm: 0 },
						}}
					>
						<IconButton
							sx={{
								...leftIconsSx,
								bgcolor: { xs: '#a3a3a3', md: '#efefef' },
								...mobileLeftIconsSx,
							}}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 24 24"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M19.049 4.951a3.953 3.953 0 0 0-1.028-1.801c-1.51-1.51-4.146-1.51-5.656 0a4.009 4.009 0 0 0-.618 4.86l-3.714 3.714c-1.505-.89-3.591-.649-4.86.618a4.004 4.004 0 0 0 0 5.657 3.946 3.946 0 0 0 1.8 1.028c.178.681.53 1.302 1.028 1.8A3.966 3.966 0 0 0 8.829 22a3.973 3.973 0 0 0 2.828-1.172 4.007 4.007 0 0 0 .617-4.859l3.714-3.714c1.507.891 3.593.65 4.861-.619a4.003 4.003 0 0 0 0-5.656 3.942 3.942 0 0 0-1.8-1.029zm.387 5.271c-.756.755-2.073.756-2.829 0l-.707-.707-6.363 6.364.707.707a2.003 2.003 0 0 1 0 2.828c-.757.757-2.074.755-2.829 0a1.963 1.963 0 0 1-.571-1.31l-.047-.9-.9-.047a1.972 1.972 0 0 1-1.31-.571 2.003 2.003 0 0 1 0-2.829c.377-.377.879-.585 1.413-.585s1.036.208 1.414.585l.707.707 6.364-6.363-.707-.707a2.003 2.003 0 0 1 0-2.829c.756-.754 2.072-.754 2.828 0 .343.343.546.809.572 1.312l.048.897.897.048c.503.026.969.229 1.312.572.377.378.585.88.585 1.414s-.207 1.036-.584 1.414z"></path>
							</svg>
						</IconButton>
						<IconButton
							sx={{
								...leftIconsSx,
								bgcolor: { xs: '#a3a3a3', md: '#efefef' },
								...mobileLeftIconsSx,
							}}
						>
							<Redeem color="action" sx={{ fontSize: 20 }} />
						</IconButton>
						<IconButton
							sx={{
								...leftIconsSx,
								bgcolor: { xs: '#a3a3a3', md: '#efefef' },
								...mobileLeftIconsSx,
							}}
						>
							<MonetizationOnIcon color="action" sx={{ fontSize: 20 }} />
						</IconButton>
						<IconButton
							sx={{ ...leftIconsSx, bgcolor: { xs: '#a3a3a3', md: '#efefef' } }}
						>
							En
						</IconButton>
						<Badge
							badgeContent={95}
							color="primary"
							max={99}
							sx={{
								display: { xs: 'none', md: 'block' },
								'& span': {
									color: '#fff',
									fontSize: '10px',
									height: '18px',
									width: '30px',
									top: '2px',
									right: '2px',
								},
							}}
						>
							<IconButton
								sx={{
									...leftIconsSx,
									display: { xs: 'none', sm: 'inline-flex' },
								}}
							>
								<Email color="action" sx={{ fontSize: 20 }} />
							</IconButton>
						</Badge>
						<IconButton
							onClick={() => {
								if (!user) {
									return setOpenDialog(DialogId.postAdDialog);
								}
								return setOpenDialog(DialogId.postAdDialog);
							}}
							sx={{
								fontSize: 13,
								height: 28,
								bgcolor: 'primary.main',
								borderRadius: 8,
								color: '#fff',
								display: { xs: 'none', md: 'inline-flex' },
								'&:hover': {
									bgcolor: 'primary.main',
									borderRadius: 8,
									color: '#fff',
								},
							}}
						>
							Post Ad
						</IconButton>
						<IconButton
							onClick={() => {
								if (!user) {
									setOpenDialog(DialogId.authDialog);
								}
							}}
							sx={{
								...leftIconsSx,
								display: { xs: 'none', md: 'inline-flex' },
							}}
						>
							<ArrowDropDownIcon sx={{ fontSize: 28 }} />
						</IconButton>
					</Stack>
				</Toolbar>
			</AppBar>
			{user && (
				<AppBar
					position="sticky"
					sx={{
						borderRadius: 0,
						bgcolor: '#fff',
						boxShadow: 0,
						borderBottom: { xs: 0, md: 1 },
						borderColor: { md: 'text.disabled' },
						width: '100%',
						display: { xs: 'none', sm: 'flex' },
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						minHeight: 20,
						height: 'fit-content',
						top: 50,
					}}
				>
					<Toolbar
						sx={{
							justifyContent: { xs: 'space-between', md: 'center' },
							bgcolor: '#fff',
							p: 0.5,
							height: 'fit-content',
							px: { xs: 1, md: '0px!important' },
							width: { xs: '100%' },
						}}
					>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							sx={{
								flexWrap: 'wrap',
								width: 500,
								height: '100%',
								pl: '36px',
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<Chip
								label="All Product"
								sx={{
									...chipSx,
								}}
							/>
							<Chip
								label="All Order"
								sx={{
									...chipSx,
								}}
							/>
							<Chip
								label="My Page"
								sx={{
									...chipSx,
								}}
							/>
							<Chip
								label="Promote"
								sx={{
									...chipSx,
								}}
							/>

							{/* <Chip
								onClick={() => {
									if (session) {
										return signOut({ redirect: true });
									}
									if (window) {
										localStorage.setItem('shadamon-auth', '');
										window.location.reload();
									}
								}}
								label="Log out"
								sx={{
									...chipSx,
								}}
							/> */}
						</Stack>
					</Toolbar>
				</AppBar>
			)}
			<CustomDialog
				open={openDialog === DialogId.postAdDialog}
				handleClose={() => setOpenDialog('')}
				id={DialogId.postAdDialog}
			>
				{user && <PostAdDialog handleClose={() => setOpenDialog('')} />}
				{!user && (
					<Authentication
						handleClose={() => setOpenDialog('')}
						postAd={true}
						defaultPage={'postad'}
					/>
				)}
			</CustomDialog>
			<CustomDialog
				open={openDialog === DialogId.authDialog}
				handleClose={() => setOpenDialog('')}
				id={DialogId.authDialog}
			>
				<Authentication handleClose={() => setOpenDialog('')} />
			</CustomDialog>
		</Fragment>
	);
};

export default Header;
