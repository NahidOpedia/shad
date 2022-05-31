import CustomImage from '@app/atoms/CustomImage';
import CustomLink from '@app/atoms/CustomLink';
import { ArrowBack, Email, Facebook, Google } from '@mui/icons-material';
import {
	Box,
	Button,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import AuthTextFields from './AuthTextFields';

type Props = {
	postAd?: boolean;
	defaultPage?: string;
	handleClose: () => void;
};

const Authentication = ({ postAd, defaultPage, handleClose }: Props) => {
	const { data: session } = useSession();
	console.log(session, 'session');
	const [page, setPage] = useState(defaultPage || 'login');
	const [emailLogin, setEmailLogin] = useState(false);
	const getImage = () => {
		if (page === 'login') {
			return '/assets/login.png';
		} else if (page === 'signup') {
			return '/assets/signup.png';
		} else {
			return '/assets/post-ad.png';
		}
	};

	const TitleText = () => {
		const text = () => {
			if (page === 'login') {
				return 'Log in';
			}
			if (page === 'signup') {
				return 'Sign up';
			}
			return 'Post an Ad';
		};
		return (
			<Typography align="center" fontWeight={'bold'} sx={{ fontSize: 18 }}>
				{text()}
			</Typography>
		);
	};

	const SubtitleText = () => {
		const text = () => {
			if (page === 'login') {
				return '';
			}
			if (page === 'signup') {
				return 'Sign up and enjoy may facilities.';
			}
			return 'Please Sign Up to post your ad.';
		};

		return (
			<Typography align="center" variant="subtitle1" sx={{ color: 'grey.600' }}>
				{text()}
			</Typography>
		);
	};

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
					pt: '45px',
					px: { xs: 2 },
					pb: 4,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Stack
					direction={'row'}
					sx={{
						borderRadius: '10px',
						border: 1,
						borderColor: 'text.disabled',
						bgcolor: 'background.default',
						width: 110,
						height: 31,
						alignItems: 'center',
					}}
				>
					<Typography
						variant="subtitle2"
						align="center"
						sx={{ p: 0.5, width: '50%' }}
					>
						বাংলা
					</Typography>
					<Typography
						variant="subtitle2"
						align="center"
						sx={{
							width: '50%',
							p: 0.5,
							bgcolor: 'rgb(13, 110, 253)',
							borderTopRightRadius: '10px',
							borderBottomRightRadius: '10px',
							color: '#fff',
							height: 31,
						}}
					>
						ENG
					</Typography>
				</Stack>

				<CustomImage src={getImage()} height={100} width={104} />
				<Box>
					<TitleText />
					<SubtitleText />
				</Box>

				{emailLogin && <AuthTextFields isLogin={page === 'login'} />}

				{!emailLogin && (
					<>
						<Button
							variant="outlined"
							fullWidth
							sx={{
								justifyContent: 'flex-start',
								pl: '90px',
								maxWidth: 400,
								borderColor: 'text.primary',
								color: 'text.primary',
								'&:hover': {
									borderColor: 'text.primary',
									color: 'text.primary',
								},
							}}
							onClick={() => signIn('google')}
							startIcon={
								<CustomImage
									src={'/assets/google-logo.png'}
									height={17}
									width={17}
								/>
							}
						>
							Continue with Google
						</Button>
						<Button
							variant="contained"
							fullWidth
							onClick={() => signIn('facebook')}
							sx={{
								justifyContent: 'flex-start',
								pl: '90px',
								color: '#fff',
								bgcolor: '#214b8a',
								maxWidth: 400,

								'&:hover': {
									bgcolor: '#132b50',
								},
							}}
							startIcon={<Facebook />}
						>
							Continue with Facebook
						</Button>
						<Button
							variant="contained"
							fullWidth
							onClick={() => setEmailLogin(!emailLogin)}
							sx={{
								justifyContent: 'flex-start',
								pl: '90px',
								color: '#fff',
								maxWidth: 400,
							}}
							startIcon={<Email />}
						>
							Continue with Email or Mobile
						</Button>
					</>
				)}
				<Divider
					light
					orientation="horizontal"
					sx={{
						width: '100%',
						maxWidth: 400,
						mt: '21px!important',
						mb: '8px!important',
					}}
				/>
				<Typography variant="caption" sx={{ fontStyle: 'italic' }}>
					{page === 'login'
						? "Don't have an account?"
						: 'Already have an account ?'}
				</Typography>
				<Button
					onClick={() => setPage(page === 'login' ? 'signup' : 'login')}
					variant="outlined"
					sx={{
						bgcolor: '#b5babe',
						borderColor: 'text.primary',
						color: 'text.primary',
						width: 170,
						'&:hover': {
							bgcolor: '#b5babe',
							borderColor: 'text.primary',
							color: 'text.primary',
						},
					}}
				>
					{page === 'login' ? 'Sign up' : 'Log in'}
				</Button>
				{page === 'login' && <CustomLink href="/">Forgot Password?</CustomLink>}
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

export default Authentication;
