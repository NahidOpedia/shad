import axios from 'axios';

export default axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_API_URI
			: 'http://localhost:7000/',
	withCredentials: true,
});
