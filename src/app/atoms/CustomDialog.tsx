import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-root': {
		bottom: 5,
	},
	'& .MuiDialog-paper': {
		minWidth: 'min(500px, 100vw)',
		borderRadius: '13px',
		border: 1,
		borderColor: theme.palette.text.disabled,
		margin: 0,
		marginBottom: 10,
		height: 'calc(100vh - 170px)',
		position: 'relative',
		overflowY: 'visible',
	},
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export interface DialogTitleProps {
	id?: string;
	children?: React.ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle
			sx={{
				m: 0,
				p: 0,
				pt: '10px',
				px: 1,
				display: 'flex',
				justifyContent: children ? 'space-between' : 'flex-end',
			}}
			{...other}
		>
			{children}
			{/* {onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						color: '#00000060',
						bgcolor: '#e4e4e4',
						'&:hover': {
							bgcolor: '#e4e4e4',
						},
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						style={{ width: 25 }}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</IconButton>
			) : null} */}
		</DialogTitle>
	);
};

export interface DialogProps {
	id: string;
	title?: string;
	bgcolor?: string;
	open: false | true;
	handleClose: () => void;
	children: React.ReactNode;
}

const CustomDialog: React.FC<DialogProps> = ({
	title,

	bgcolor,
	id,
	open,
	handleClose,
	children,
}) => {
	return (
		<>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby={id}
				open={open}
				scroll={'paper'}
				sx={{
					'& .MuiDialog-paper': {
						bgcolor: bgcolor ? bgcolor : '#fff',
						marginLeft: { xs: 0, sm: '56px' },
					},
				}}
			>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						color: '#00000060',
						bgcolor: '#e4e4e4',
						position: 'absolute',
						right: 17,
						top: 10,
						zIndex: 5,
						'&:hover': {
							bgcolor: '#e4e4e4',
						},
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						style={{ width: 25 }}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</IconButton>
				<DialogContent
					className="scrollbar-hover"
					sx={{
						p: '0px!important',
						maxWidth: 500,
						height: 576,
						overflowY: 'scroll',
					}}
				>
					{children}
				</DialogContent>
			</BootstrapDialog>
		</>
	);
};
export default CustomDialog;
