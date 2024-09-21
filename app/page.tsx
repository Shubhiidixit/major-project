"use client";

import React from "react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-dark text-white">
      <header className="w-full flex justify-between items-center p-5">
        <div className="flex items-center">
          <img src="/logo.png" alt="MultiGen AI Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">MultiGen AI</h1>
        </div>

        <div className="flex items-center space-x-4"> {/* Flex container to space out buttons */}
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <button className="px-6 py-2 bg-white text-dark rounded-full font-semibold hover:bg-gray-300 transition">
              Get Started
            </button>
          </Link>

          {isSignedIn && (
            <div> {/* UserButton should appear after Get Started */}
              <UserButton />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-white font-bold py-10 text-center space-y-2">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-2 font-extrabold">
            <h2>The Ultimate AI Tool for</h2>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              <TypewriterComponent
                options={{
                  strings: [
                    "Chatbot.",
                    "Image Generation.",
                    "Audio Generation.",
                    "Code Generation.",
                    "Video Generation.",
                    "Music Generation.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        </div>
        <p className="text-lg md:text-2xl text-gray-400 mb-4">
          Accelerate content creation with AI, 10x faster.
        </p>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition">
            Try For Free
          </button>
        </Link>
      </main>
    </div>
  );
}
