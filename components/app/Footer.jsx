"use client";
import React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="hover:underline" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Movies
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Theaters
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">Contact Us</h4>
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-medium">Address:</span> 123 Main St,
                Anytown USA
              </div>
              <div>
                <span className="font-medium">Phone:</span> +1 (555) 555-5555
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Social:</span>
                <Link
                  href="#"
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <InstagramIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">About Us</h4>
            <p>
              We are a leading movie ticket booking platform, providing
              convenient and hassle-free booking experiences for our customers.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">Newsletter</h4>
            <p>
              Subscribe to our newsletter to stay up-to-date with the latest
              movie releases and promotions.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2024 Movie Ticket Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
