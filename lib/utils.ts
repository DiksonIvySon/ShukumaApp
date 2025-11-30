import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// <CHANGE> Add named export for cn function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
