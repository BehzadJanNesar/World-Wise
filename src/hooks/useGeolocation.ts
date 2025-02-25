import { useState } from "react";
import { Position } from "../Types/Types";

export function useGeolocation(defaultPosition = null) {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [position, setPosition] = useState<Position | null>(defaultPosition);
   const [error, setError] = useState<string | null>(null);

   function GetPosition() {
      if (!navigator.geolocation) return setError("Your browser dose not support geolocation!");

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
         (pos) => {
            setPosition({
               lat: pos.coords.latitude.toString(),
               lng: pos.coords.longitude.toString(),
            });
            setIsLoading(false);
         },
         (error) => {
            setError(error.message);
            setIsLoading(false);
         }
      );
   }
   return { isLoading, position, error, GetPosition };
}
