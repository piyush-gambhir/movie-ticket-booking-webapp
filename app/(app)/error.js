"use client";

import { useEffect } from "react";
import Link from "next/link";

import { ArrowLeft, RefreshCw, Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-foreground flex min-h-screen flex-col items-center justify-center bg-linear-to-b p-4">
      <Clapperboard
        className="text-primary mb-8 h-24 w-24 animate-pulse"
        aria-hidden="true"
      />
      <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl">
        {"500 - Technical Difficulties"}
      </h1>
      <p className="mb-8 max-w-md text-center text-xl md:text-2xl">
        We&apos;re experiencing some backstage trouble. Our crew is working to
        get the show back on track!
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => window.location.reload()}
          className="transform rounded-full px-4 py-2 font-bold transition duration-300 ease-in-out hover:scale-105"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Try Again
        </Button>
        <Link href="/" passHref>
          <Button className="bg-secondary text-foreground hover:bg-secondary transform rounded-full px-4 py-2 font-bold transition duration-300 ease-in-out hover:scale-105">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Return to Box Office
          </Button>
        </Link>
      </div>
    </div>
  );
}
