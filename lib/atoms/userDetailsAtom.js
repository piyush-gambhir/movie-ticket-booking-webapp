import { atom } from "recoil";

export const userDetailsState = atom({
  key: "userState",
  default: null, // Initial state is null, representing no user logged in
});
