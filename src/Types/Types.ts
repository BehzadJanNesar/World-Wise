import { ReactNode } from "react";

export interface Position {
   lat: string;
   lng: string;
}

export interface City {
   id: string;
   cityName: string;
   country: string;
   date: string;
   emoji: string;
   notes?: string;
   position: Position;
}

export interface CitiesContextProps {
   cities: City[];
   isLoading: boolean;
   currentCity: City | {};
   getCity: (id: string) => void;
   createCity: (newCity: FormData) => void;
   deleteCity: (id: string) => void;
}

export interface CitiesProviderProps {
   children: ReactNode;
}

export interface State {
   cities: City[];
   isLoading: boolean;
   currentCity: City | {};
   error: string | null;
}

export type Action =
   | { type: "loading" }
   | { type: "cities/loaded"; payload: City[] }
   | { type: "city/loaded"; payload: City }
   | { type: "city/created"; payload: City }
   | { type: "city/deleted"; payload: string }
   | { type: "rejected"; payload: string };

export interface FormData {
   cityName: string;
   country: string;
   emoji: string;
   date: string;
   notes: string;
   position: {
      lat: string | null;
      lng: string | null;
   };
}

export interface GeocodingData {
   city?: string;
   countryName: string;
   countryCode: string;
   locality?: string;
}
export interface ChangeCenterProps {
   position: [number, number];
}

export interface GeolocationContext {
   isLoading: boolean;
   position: Position | null;
   GetPosition: () => void;
}
