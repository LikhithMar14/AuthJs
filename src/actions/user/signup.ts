"use server"

import { SignupSchema } from "@/schema/user"
import { z } from "zod"
import bcrypt from "bcryptjs"
import db from "@/db"

export const signup = async(values:z.infer<typeof SignupSchema>) => {
    const validatedFields =  SignupSchema.safeParse(values);
    if(!validatedFields.success){
        return {error : "Invalid Fields"}
    }
    
    const {email, password, username} = validatedFields.data;

    const hashedPassword  = await bcrypt.hash(password,10)

    const existingUser = await db.user.findFirst({
        where:{email}
    })
    if (existingUser) {
        return { error: "Email already in use!" };
      }
    await db.user.create({
        data:{
            username,
            password : hashedPassword,
            email
        }
    })

    return { success: "User Created "}

}