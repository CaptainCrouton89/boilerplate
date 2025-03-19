"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { resetPasswordAction } from "../login/actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);

      await resetPasswordAction(formData);

      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      form.setError("email", {
        type: "manual",
        message:
          "There was a problem sending the password reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero3.webp"
          alt="Technology background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-black/5"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-background/80 border-white/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Reset your password
          </CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-md bg-primary/10 p-4">
                <p className="text-sm text-primary">
                  Check your email for a link to reset your password. If it
                  doesn't appear within a few minutes, check your spam folder.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/login">Return to login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending reset link..." : "Send reset link"}
                </Button>
                <Suspense>
                  <FormAlert />
                </Suspense>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
