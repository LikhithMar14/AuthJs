"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/schema/user";
import { AuthError } from "next-auth";
import z from "zod";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields !" };
  }
  const { email, password } = validatedFields.data;
  console.log("Hello0")


  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log(response)
    console.log("Hello 3")
    
    return {success:"Login Successful"}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials"};
        case "CredentialsSignin":
          throw error;
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error
  }
};
