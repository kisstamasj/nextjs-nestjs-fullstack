import NextAuth from 'next-auth';
import type { NextAuthOptions } from "next-auth";
import options from './options';

const authOptions: NextAuthOptions = options;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
