  "use client";

  import z from "zod";
  import { useForm } from "react-hook-form";
  import { useState, useTransition } from "react";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { LoginSchema } from "@/schema/user";
  import { useSearchParams } from "next/navigation";
  import axios from "axios";

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { CardWrapper } from "./CardWrapper";
  import Link from "next/link";
  import { FormSuccess } from "../formStatus/formSuccess";
  import { FormError } from "../formStatus/formError";

  export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError =
      searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition(); //To make UI responsive when doing async operations

    const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");
    
      startTransition(async () => {
        try {
          const response = await axios.post("/api/auth/login", values);
          const data = response.data;
    
          if (response.status !== 200) {
            setError(data?.error || "Something went wrong");
            form.reset();
          } else {
            alert("Sucess")
            setSuccess(data?.success || "Login successful!");
            form.reset();
    
            if (callbackUrl) {
              window.location.href = callbackUrl;
            }
          }
        } catch (error) {
          setError("Something went wrong during login.");
          form.reset();
        }
      });
    };

    return (
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/signin"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
  };
