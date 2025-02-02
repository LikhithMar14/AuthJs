import NextAuth from "next-auth"
import authConfig from "@/auth.config"
 

import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/db"
import { Role } from "@prisma/client"

 
export const { handlers, auth, signIn, signOut } = NextAuth({

  pages:{
    signIn:"/login",
    
  },

  callbacks:{

      async session({ token , session}){

        return session
      },
      async jwt({ token }){

        const existingUser = await db.user.findUnique({where:{id:token.sub}});
        if(!existingUser)return token;
        token.role = existingUser.role
        return token
      }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})