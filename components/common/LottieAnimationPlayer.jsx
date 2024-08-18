"use client";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LottieAnimationPlayer({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  style = {},
  className = "",
}) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      className={className}
      style={style}
      speed={speed}
    />
  );
}
