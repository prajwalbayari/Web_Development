import { useContext } from "react";
import { Context } from "./events";

export const EVENT_COLORS = ["red", "blue", "green"] as const;

export function useEvents() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("useEvents must be used inside an EventsProvider");
  }
  return value;
}
