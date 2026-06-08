"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "../ui/input-group";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at max 12 characters long")
})

type signInValues = z.infer<typeof formSchema>;



export default function SignInForm() {

  const form = useForm<signInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: signInValues) {
    // console.log(data);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
      rememberMe: true,
    }, {
      onRequest: (ctx) => {
        setIsLoading(true);
      },
      onSuccess: (ctx) => {
        setIsLoading(false)
        router.push("/");
        toast.success("Sign in successful")
      },
      onError(ctx) {
        setIsLoading(false);
        toast.error(ctx.error.message);
        console.log("Email,password sign in error ", ctx.error.message)
      },
    })

  }
  const handleGoogleLogin = async () => {
    // console.log("Google")
    await signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/",
      // disableRedirect: true,
    });
  }

  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-blue-600 text-center">Sign In</CardTitle>
        <CardDescription className="font-medium text-center">Please sign in to enter</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter a valid email"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter a valid email"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <div className="mt-4">
          <Button className="w-full hover:cursor-pointer" type="submit" form="form-rhf-demo">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        <div className="pt-2 text-center">
          New register, please <Link href={"/auth/signUp"}><span className="text-blue-600 hover:cursor-pointer underline">Sign Up </span></Link>here
        </div>
      </CardContent>
      <FieldSeparator className="w-1/2 mx-auto"></FieldSeparator>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={handleGoogleLogin} className="w-full bg-blue-400 hover:bg-blue-600 cursor-pointer" >
            Sign in with google
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
