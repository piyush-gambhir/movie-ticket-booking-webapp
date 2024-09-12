import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function NoOffersAvailable() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Offers Available</AlertTitle>
          <AlertDescription>
            We&apos;re sorry, but there are currently no special offers for
            movie tickets. Please check back later for exciting deals!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
