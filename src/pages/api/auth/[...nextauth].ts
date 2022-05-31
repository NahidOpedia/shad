import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		FacebookProvider({
			clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET_ID,
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID,
		}),
	],
};

const NextAuthApi = (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
export default NextAuthApi;
