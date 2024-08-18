import React from "react";
import { redirect } from "next/navigation";
import auth from "@/lib/auth";

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/routes";

import BuyTickets from "@/components/buyTickets/BuyTickets";

export default async function page() {
  // const session = await auth();
  // if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT);

  return <BuyTickets />;
}
