import { signOutAction } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/client";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("user", user);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoading(false);
    });
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 rounded-full">
            <Avatar>
              <AvatarFallback className="bg-accent text-accent-foreground">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">Account</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex w-full cursor-pointer items-center"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex w-full cursor-pointer items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <form action={signOutAction} className="w-full">
            <DropdownMenuItem asChild>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-3 items-center">
      <div className="hidden sm:flex gap-2">
        <Button asChild size="sm" variant={"outline"} className="font-medium">
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"} className="font-medium">
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="sm:hidden">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 sm:hidden">
          <DropdownMenuItem asChild>
            <Link
              href="/login"
              className="flex w-full cursor-pointer items-center"
            >
              Sign in
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/register"
              className="flex w-full cursor-pointer items-center"
            >
              Sign up
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
