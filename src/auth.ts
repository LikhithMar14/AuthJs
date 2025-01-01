import NextAuth from "next-auth"
import authConfig from "@/auth.config"
 

import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/db"
import { Role } from "@prisma/client"

 
export const { handlers, auth, signIn, signOut } = NextAuth({

  callbacks:{
      async session({ token , session}){
        if(token.sub && session.user){
          session.user.id = token.sub
        }
        if(token.role && session.user){
          session.user.role = token.role as Role
        }
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