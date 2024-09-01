import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Movies from "@/components/admin/Movies";
import Theaters from "@/components/admin/Theaters";

export default function Admin() {
  return (
    <div className="container mx-auto min-h-[80vh] space-y-8 p-4">
      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="theaters">Theaters</TabsTrigger>
        </TabsList>
        <TabsContent value="movies" className="space-y-4">
          <Movies />
        </TabsContent>
        <TabsContent value="theaters" className="space-y-4">
          <Theaters />
        </TabsContent>
      </Tabs>
    </div>
  );
}
