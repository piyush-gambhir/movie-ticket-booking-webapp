import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-muted">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>
        <div className="p-2">
          <Skeleton className="mb-2 h-5 w-3/4" />
          <div className="my-2 flex flex-wrap gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieCardSkeleton;
