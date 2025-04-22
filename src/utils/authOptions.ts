/* eslint-disable @typescript-eslint/no-unused-vars */
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pages } from 'next/dist/build/templates/app-page';
import { signIn } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

interface UserWithRole extends User {
  role: string;
  access_token: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile, tokens) {
        let userRole = 'user';
        if (profile.email == 'arfinchowa524@gmail.com') {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },

      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        ).then((res) => res.json());

        if (user) {
          return {
            ...user.user,
            role: user.user.role,
            access_token: user.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        const typedUser = user as UserWithRole;
        token.role = typedUser.role;
        token.accessToken = typedUser.access_token;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        const typesSession = session.user as UserWithRole;
        typesSession.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
