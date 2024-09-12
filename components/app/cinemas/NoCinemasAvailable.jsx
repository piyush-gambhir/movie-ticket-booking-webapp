"use client";
import { MapPin, RefreshCcw, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoCinemasAvailable() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted p-3">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            No Cinemas Available
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-muted-foreground">
            We couldn&apos;t find any cinemas matching your criteria. This could
            be due to your current search filters or because we haven&apos;t
            added any cinemas in your area yet.
          </p>
          <p className="text-muted-foreground">
            Try adjusting your search or check back later as we&apos;re
            constantly updating our cinema listings.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => console.log("Reset search")}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Search
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => console.log("Contact support")}
          >
            <MailIcon className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
