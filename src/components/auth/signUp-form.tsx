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
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, "Your name should be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(12, "Password must be at max 12 characters long"),
  confirmPassword: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at max 12 characters long")
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

type signUpValues = z.infer<typeof formSchema>;



export default function SignUpForm() {

  const form = useForm<signUpValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const [isLoading,setIsLoading]=useState(false);
  const router=useRouter();

  async function onSubmit(data: signUpValues) {
    console.log(data);
    const { error } = await signUp.email({
      name:data.name, // user display name
      email:data.email, // user email address
      password:data.password, // user password -> min 8 characters by default// User image URL (optional)
      callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    }, {
      onRequest: (ctx) => {
        setIsLoading(true);
      },
      onSuccess: (ctx) => {
        setIsLoading(false);
        router.push("/");
        toast.success("Sign up successful")
      },
      onError: (ctx) => {
        setIsLoading(false);
        toast.error(ctx.error.message);
      },
    });
  }

  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-blue-600 text-center">Sign Up</CardTitle>
        <CardDescription className="font-medium text-center">Please sign up to enter</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your name"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                    placeholder="Please enter your password"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-confirmPassword">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-confirmPassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please confirm your password"
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
            Submit
          </Button>
        </div>
        <div className="pt-2 text-center">
          Already signed up, please <Link href={"/auth/signIn"}><span className="text-blue-600 hover:cursor-pointer underline">Sign In </span></Link>here
        </div>
      </CardContent>
    </Card>
  )
}
