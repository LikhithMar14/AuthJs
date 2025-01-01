import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Github   from  "next-auth/providers/github"
import Google   from   "next-auth/providers/google"
import { LoginSchema } from "./schema/user"
import db from "./db";
import bcrypt from "bcryptjs"
 
export default {
  providers: [Google,Github,
    Credentials({
            credentials: {
        email: {},
        password: {},
      },
        async authorize(credentials){
            console.log("Hello1")
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email,password} = validatedFields.data;

                const existingUser = await db.user.findUnique({
                    where:{email}
                })
                if(!existingUser || !existingUser.password)return null
                const PasswordMatch =  await bcrypt.compare(password,existingUser.password)
                console.log("Hello2")

                console.log(existingUser)

                if(PasswordMatch){
                  return existingUser
                }
            }
            return null
        }
    })
  ],
}