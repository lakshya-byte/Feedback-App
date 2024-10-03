"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="bg-purple-600 p-4 md:p-6 shadow-md text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-3xl font-bold mb-4 md:mb-0 hover:text-purple-300 transition-colors" href="#">
          Mystry Message
        </a>
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="mr-4 text-base md:text-lg font-medium">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              className="bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              variant="outline"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <button className="bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
