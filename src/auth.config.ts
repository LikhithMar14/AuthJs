import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema/user"
import db from "./db";
import bcrypt from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        async authorize(credentials){
            console.log("Hello1")
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email,password} = validatedFields.data;

                const existingUser = await db.user.findFirst({
                    where:{email}
                })
                if(!existingUser || !existingUser.password)return null
                const PasswordMatch =  await bcrypt.compare(existingUser.password,password)
                console.log("Hello2")

                console.log(existingUser)

                if(PasswordMatch)return existingUser
            }
            return null
        }
    })
  ],
} satisfies NextAuthConfig