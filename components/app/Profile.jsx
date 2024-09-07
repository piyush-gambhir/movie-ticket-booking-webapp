"use client";
import React, { useState } from "react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { DatePicker } from "@/components/common/DatePicker";

export default function Profile({ userDetails }) {
  const [user, setUser] = useState(userDetails);
  const [reservations, setReservations] = useState([]);
  return (
    <div className="container mx-auto min-h-[80vh] py-10">
      <div className="grid gap-6">
        <Tabs defaultValue="profile" className="">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  View and edit your profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-5">
                  <Label htmlFor="name" className="flex items-center text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={user?.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="col-span-2"
                  />
                </div>
                <div className="grid grid-cols-5">
                  <Label htmlFor="email" className="flex items-center text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user?.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="col-span-2"
                  />
                </div>
                <div className="grid grid-cols-5">
                  <Label htmlFor="Phone" className="flex items-center text-sm">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={user?.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="col-span-2"
                  />
                </div>
                {/* Date of Birth */}
                <div className="grid grid-cols-5">
                  <Label htmlFor="dob" className="flex items-center text-sm">
                    Date of Birth
                  </Label>
                  <div className="col-span-2 w-full">
                    <DatePicker
                      selectedDate={user?.dateOfBirth}
                      onDateChange={(date) =>
                        setUser({ ...user, dateOfBirth: date })
                      }
                    />
                  </div>
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
                  {reservations.map((booking) => (
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
