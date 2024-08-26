"use client";
import React, { useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FilmIcon,
  MapPinIcon,
  SettingsIcon,
  TicketIcon,
  UserIcon,
} from "lucide-react";

export default function Profile({ userDetails }) {
  const [user, setUser] = useState(userDetails);

  const bookingHistory = [
    {
      id: 1,
      movie: "Inception",
      date: "2023-05-15",
      theater: "Cineplex Downtown",
    },
    {
      id: 2,
      movie: "The Dark Knight",
      date: "2023-06-02",
      theater: "IMAX Uptown",
    },
    {
      id: 3,
      movie: "Interstellar",
      date: "2023-06-20",
      theater: "Starlight Cinema",
    },
  ];

  const favoriteGenres = ["Sci-Fi", "Action", "Drama", "Thriller"];
  const preferredTheaters = [
    "Cineplex Downtown",
    "IMAX Uptown",
    "Starlight Cinema",
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">User Profile</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="justify-start">
                <TicketIcon className="mr-2 h-4 w-4" />
                Bookings
              </Button>
              {/* <Button variant="ghost" className="justify-start">
                <FilmIcon className="mr-2 h-4 w-4" />
                Preferences
              </Button> */}
              <Button variant="ghost" className="justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            {/* <TabsTrigger value="preferences">Preferences</TabsTrigger> */}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  View and edit your profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user?.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>
                  Your recent movie ticket bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="mb-4 last:mb-0">
                      <h3 className="font-semibold">{booking.movie}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.theater}
                      </p>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Movie Preferences</CardTitle>
                <CardDescription>
                  Your favorite genres and preferred theaters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Favorite Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {favoriteGenres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Preferred Theaters</h3>
                  <div className="space-y-2">
                    {preferredTheaters.map((theater) => (
                      <div key={theater} className="flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{theater}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <select
                    id="notifications"
                    className="w-full rounded-md border p-2"
                  >
                    <option>All notifications</option>
                    <option>Important only</option>
                    <option>None</option>
                  </select>
                </div>
                <Button>Update Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
