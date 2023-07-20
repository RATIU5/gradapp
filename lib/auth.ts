import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (!account || !profile) return false;
  //     if (account.provider === "google") {
  //       return profile.email?.endsWith("@btech.edu") || false;
  //     }
  //     return false;
  //   },
  // },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
