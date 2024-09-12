import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <Film className="mb-8 h-24 w-24 text-red-500" aria-hidden="true" />
      <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl">
        404 - Scene Not Found
      </h1>
      <p className="mb-8 max-w-md text-center text-xl md:text-2xl">
        Oops! It looks like this ticket doesn&apos;t lead anywhere.
      </p>
      <Link href="/" passHref>
        <Button className="transform rounded-full bg-red-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-600">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Return to Box Office
        </Button>
      </Link>
    </div>
  );
}
