"use client";
import React from "react";
import { RecoilRoot } from "recoil";

export function RecoilRootProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
