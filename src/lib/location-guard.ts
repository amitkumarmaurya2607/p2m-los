import axios from "axios";

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
}

let cachedLocation: LocationData | null = null;

export async function getLocationGuard(): Promise<LocationData> {
  if (cachedLocation) return cachedLocation;
    return;
  const { data } = await axios.get<LocationData>("https://ipapi.co/json/");
  cachedLocation = data;
  return data;
}

export function clearLocationCache(): void {
  cachedLocation = null;
}
