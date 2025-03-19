"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function RegistrationConfirmationPage() {
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
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>We've sent you a confirmation email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-primary/10 p-4">
            <p className="text-sm text-primary">
              We've sent a confirmation email to the address you provided.
              Please click the link in the email to verify your account.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              If you don't see the email in your inbox, please check your spam
              folder. The confirmation link will expire in 24 hours.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/login">Return to login</Link>
          </Button>
          <div className="text-xs text-center text-muted-foreground">
            Didn't receive the email?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Try again
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
