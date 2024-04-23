import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
    return session;
  },

  //   To get the user session we have to first signIn

  async signIn({ profile }) {
    try {
      await connectToDB();

      //check if userExist
      const userExist = await User.findOne({
        email: profile.email,
      });

      //If not then create user
      if (!userExist) {
        await User.create({
          email: profile.email,
          username: profile.name,
          image: profile.img,
        });
      }
      return true;
    } catch (error) {
      console.log("Err in signIN", error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
