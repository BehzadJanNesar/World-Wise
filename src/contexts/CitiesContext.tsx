import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface City {
   cityName: string;
   emoji: string;
   date: string;
   notes?: string;
}

interface CitiesContextProps {
   cities: City[];
   loading: boolean;
   // currentCity: City | null;
   getCity: (id: string) => void;
}

interface CitiesProviderProps {
   children: ReactNode;
}

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }: CitiesProviderProps) {
   const [cities, setCities] = useState([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [currentCity, setCurrentCity] = useState({});

   useEffect(() => {
      async function getData() {
         try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/cities`);
            const data = await res.data;
            setCities(data);
         } catch {
            alert("There was an error loading data...");
         } finally {
            setLoading(false);
         }
      }
      getData();
   }, []);

   async function getCity(id: string) {
      try {
         setLoading(true);
         const res = await axios.get(`${BASE_URL}/cities/${id}`);
         const data = await res.data;
         setCurrentCity(data);
      } catch {
         alert("There was an error loading data...");
      } finally {
         setLoading(false);
      }
   }

   const value: CitiesContextProps = {
      cities,
      loading,
      currentCity,
      getCity,
   };

   return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

const useCities = () => {
   const context = useContext(CitiesContext);
   if (context === undefined) throw new Error("CitiesContext must be used within a CitiesProvider");
   return context;
};

export { CitiesProvider, useCities };
