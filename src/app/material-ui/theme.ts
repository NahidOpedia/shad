import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const fontFamily = [
	'-apple-system',
	'BlinkMacSystemFont',
	'Segoe UI',
	'Roboto',
	'Oxygen',
	'Ubuntu',
	'Cantarell',
	'Fira Sans',
	'Droid Sans',
	'Helvetica Neue',
	'sans-serif',
].join(',');

const grey = {
	900: '#050505', // Main Text
	800: '#252525d6', // Paragraph
	700: '#4B566B',
	600: '#94A4C4', // Low Priority form Title/Text
	500: '#A1AFCB',
	400: '#dee2e6', // Border
	300: '#E0E9FB',
	200: '#E4EDFF', // Line Stroke
	100: '#F2F5F9',
};

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#ff7519',
		},
		secondary: {
			main: '#00000060',
		},
		error: {
			main: red.A400,
		},
		text: {
			primary: '#212529',
			disabled: '#dee2e6',
		},
		background: {
			default: '#f2f3f7',
		},
		grey,
	},
	typography: {
		fontFamily,
		fontSize: 14,
		body1: { lineHeight: '22.5px' },
		subtitle2: { lineHeight: '16px', fontSize: 14 },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					minHeight: '20px!important',
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				container: {
					alignItems: 'flex-end',
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					paddingTop: '4px',
					paddingBottom: '4px',
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 32,
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					padding: '5px',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					lineHeight: '15px',
					minWidth: 10,
					p: 0,
				},
			},
		},
	},
});

export default theme;
