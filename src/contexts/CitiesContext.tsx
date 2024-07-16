import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface CitiesProviderProps {
   children: React.ReactNode;
}

interface CitiesContextProps {
   cities: any[];
   loading: boolean;
}

const CitiesContext = createContext<CitiesContextProps>({
   cities: [],
   loading: false,
});

const BASE_URL = "http://localhost:9000";
function CitiesProvider({ children }: CitiesProviderProps) {
   const [cities, setCities] = useState<[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      async function getData() {
         try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/cities`);
            const data = await res.data;
            setCities(data);
         } catch {
            alert("there was an error to loading data...");
         } finally {
            setLoading(false);
         }
      }
      getData();
   }, []);

   const value = {
      cities,
      loading,
   };

   return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

const useCities = () => {
   const context = useContext(CitiesContext);
   if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
   return context;
};

export { CitiesProvider, useCities };
