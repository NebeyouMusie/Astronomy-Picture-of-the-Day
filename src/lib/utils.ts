import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return format(new Date(date), "MMMM d, yyyy");
}

export const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
export const NASA_API_URL = "https://api.nasa.gov/planetary/apod";

export interface APODResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}

export async function fetchAPOD(params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams({
    api_key: NASA_API_KEY,
    ...params,
  });

  const response = await fetch(`${NASA_API_URL}?${searchParams}`);
  if (!response.ok) throw new Error("Failed to fetch APOD");
  return response.json();
}