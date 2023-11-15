import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import options from './options';

export const authOptions: AuthOptions = options;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
