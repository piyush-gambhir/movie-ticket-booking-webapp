"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Component() {
  const router = useRouter();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          router.push("/signin");
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-white">
      <div className="text-center">
        <Loader2
          className="mx-auto mb-8 h-16 w-16 animate-spin text-primary"
          aria-hidden="true"
        />
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Signing Out</h1>
        <p className="mx-auto mb-8 max-w-md text-xl">
          Please wait while we securely log you out of your account.
        </p>
        <p className="text-lg text-gray-400">
          You will be redirected in {countdown} seconds...
        </p>
      </div>
      <div className="mt-12 max-w-md text-center text-sm text-gray-500">
        <p>
          Thank you for using our service. We hope you enjoyed your cinematic
          experience!
        </p>
      </div>
    </div>
  );
}
