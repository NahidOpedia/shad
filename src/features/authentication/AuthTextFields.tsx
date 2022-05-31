import API from '@app/api-getway/API';
import { Button, Stack, TextField } from '@mui/material';
import React, { Fragment, useState } from 'react';

interface Props {
	isLogin: boolean;
}

type Data = {
	name?: string;
	email: string;
	password: string;
};

const validateEmail = (value: string | number) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value as string)) {
		return true;
	}
	if (typeof value != 'string') return false; // we only process strings!
	if (!isNaN(value as unknown as number) && !isNaN(parseFloat(value))) {
		if (value.length < 11 || value.length > 11) return false;
		return true;
	}
	return false;
};
const emailOrPhone = (value: string | number) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value as string)) {
		return 'email';
	}
	if (
		!isNaN(value as unknown as number) &&
		!isNaN(parseFloat(value as string))
	) {
		return 'phone';
	}
	return 'nothing';
};

const AuthTextFields = ({ isLogin }: Props) => {
	const [data, setData] = useState<Data>({
		name: '',
		email: '',
		password: '',
	});

	const reqData = () => {
		if (emailOrPhone(data.email) === 'email') {
			return { ...data };
		}
		return {
			phoneNumber: data.email,
			password: data.password,
			name: data.name,
		};
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isLogin) {
			if (data.email && data.password) {
				try {
					const finalData =
						emailOrPhone(data.email) === 'email'
							? { email: data.email, password: data.password }
							: {
									phoneNumber: data.email,
									password: data.password,
							  };
					const response = await API.post('/auth/login', finalData, {
						headers: {
							'Content-Type': 'application/json',
						},
					});
					alert('Login success!');
					if (window) {
						localStorage.setItem('shadamon-auth', response.data.jwtToken);
						window.location.reload();
					}
				} catch (error) {
					alert(error.response ? error.response.data.message : error.message);
				}
			}
		} else {
			if (data.email && data.password && data.name) {
				const finalData = reqData();
				try {
					const response = await API.post('/auth/signup', finalData, {
						headers: {
							'Content-Type': 'application/json',
						},
					});
					alert('Signup success!');
					if (window) {
						localStorage.setItem('shadamon-auth', response.data.jwtToken);
						window.location.reload();
					}
				} catch (error) {
					alert(error.response ? error.response.data.message : error.message);
				}
			}
		}
	};

	const handleChange =
		(props: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setData((prev) => {
				return {
					...prev,
					[props]: event.target.value,
				};
			});
		};

	return (
		<Stack
			direction="column"
			spacing={1}
			component="form"
			onSubmit={handleSubmit}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}
		>
			{!isLogin && (
				<TextField
					fullWidth
					label="Name"
					value={data.name}
					onChange={handleChange('name')}
					required
					type="text"
					sx={{ maxWidth: 400 }}
				/>
			)}
			<TextField
				fullWidth
				label="Email or Phone number"
				error={!validateEmail(data.email)}
				helperText={'Please provide a valid email or phone number'}
				required
				value={data.email}
				onChange={handleChange('email')}
				type="text"
				sx={{ maxWidth: 400 }}
			/>
			<TextField
				fullWidth
				label="Password"
				value={data.password}
				onChange={handleChange('password')}
				required
				type="password"
				sx={{ maxWidth: 400 }}
			/>
			{isLogin && (
				<Button
					variant="contained"
					type="submit"
					fullWidth
					sx={{
						color: '#fff',
						maxWidth: 400,
					}}
				>
					Log in
				</Button>
			)}

			{!isLogin && (
				<Button
					variant="contained"
					type="submit"
					fullWidth
					sx={{
						color: '#fff',
						maxWidth: 400,
					}}
				>
					Sign up
				</Button>
			)}
		</Stack>
	);
};

export default AuthTextFields;
