"use client";
import React from "react";

import LottieAnimationPlayer from "./LottieAnimationPlayer";

export default function TicketBookingLoadingModal({ isOpen, onClose }) {
  return (
    <LottieAnimationPlayer
      autoplay={true} // Optional: default to true
      loop={true} // Optional: default to true
      src="https://lottie.host/d486aecc-4fa3-43e3-81a4-bf768b7ccf78/2G8HKhrSc3.json"
      style={{ height: "200px", width: "200px" }}
      className="mx-auto"
    />
  );
}
