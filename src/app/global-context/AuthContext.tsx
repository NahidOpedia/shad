import API from '@app/api-getway/API';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
	const { data: session } = useSession();
	const [token, setToken] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function fetchUser() {
			const res = await API.get('/users', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(res.data);
		}
		if (token) {
			fetchUser();
		}
	}, [token]);
	useEffect(() => {
		if (session) {
			setUser({
				name: session.user.name,
				email: { address: session.user.email },
			});
		}
		if (window) {
			setToken(localStorage.getItem('shadamon-auth'));
		}
	}, [session]);
	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
