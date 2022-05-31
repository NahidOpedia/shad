import { Alert, Box } from '@mui/material';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarOrigin } from '@mui/material';
interface Props {
	valid: string;
	setValid: React.Dispatch<React.SetStateAction<string>>;
	invalid: string;
	setInvalid: React.Dispatch<React.SetStateAction<string>>;
	vertical?: SnackbarOrigin['vertical'];
	horizontal?: SnackbarOrigin['horizontal'];
	duration?: number;
}
const AlertMessage = ({
	valid,
	setValid,
	invalid,
	setInvalid,
	vertical = 'top',
	horizontal = 'center',
	duration,
}: Props) => {
	return (
		<>
			{valid && (
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={valid ? true : false}
					key={vertical + horizontal}
					onClose={() => setValid(null)}
					autoHideDuration={duration ? duration : 5000}
				>
					<Alert severity="success">{valid}</Alert>
				</Snackbar>
			)}
			{invalid && (
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={invalid ? true : false}
					key={vertical + horizontal}
					onClose={() => setInvalid(null)}
					autoHideDuration={duration ? duration : 5000}
				>
					<Alert severity="error" sx={{ margin: 'auto' }}>
						{invalid}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default AlertMessage;
