import { createContext, useContext, useEffect, useReducer } from "react";
import { CitiesContextProps, CitiesProviderProps, State, Action, City } from "../Types/Types";
import axios from "axios";

const initialState: State = {
   cities: [],
   isLoading: false,
   currentCity: {
      id: "",
      cityName: "",
      country: "",
      date: "",
      emoji: "",
      notes: "",
      position: {
         lat: "",
         lng: "",
      },
   },
   error: "",
};
function reducer(state: State, action: Action): State {
   switch (action.type) {
      case "loading":
         return { ...state, isLoading: true };
      case "cities/loaded": {
         return { ...state, isLoading: false, cities: action.payload };
      }
      case "city/loaded": {
         return { ...state, isLoading: false, currentCity: action.payload };
      }
      case "city/created": {
         return {
            ...state,
            isLoading: false,
            cities: [...state.cities, action.payload],
            currentCity: action.payload,
         };
      }
      case "city/deleted": {
         return {
            ...state,
            isLoading: false,
            cities: state.cities.filter((city) => city.id !== action.payload),
            currentCity: { ...state.currentCity },
         };
      }
      case "rejected": {
         return { ...state, isLoading: false, error: action.payload };
      }
      default: {
         throw new Error("Unknown action type");
      }
   }
}

const CitiesContext = createContext<CitiesContextProps | undefined>(undefined);

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }: CitiesProviderProps) {
   const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      async function getData() {
         dispatch({ type: "loading" });
         try {
            const res = await axios.get(`${BASE_URL}/cities`);
            const data = await res.data;
            dispatch({ type: "cities/loaded", payload: data });
         } catch {
            dispatch({ type: "rejected", payload: "There was an error loading cities..." });
         }
      }
      getData();
   }, []);

   async function getCity(id: string) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
         const res = await axios.get(`${BASE_URL}/cities/${id}`);
         const data = await res.data;
         dispatch({ type: "city/loaded", payload: data });
      } catch {
         dispatch({ type: "rejected", payload: "There was an error loading city..." });
      }
   }
   async function createCity(newCity: City | {}) {
      dispatch({ type: "loading" });
      try {
         const res = await axios.post(`${BASE_URL}/cities`, newCity, {
            headers: {
               "Content-type": "application/json",
            },
         });
         const data = await res.data;
         dispatch({ type: "city/created", payload: data });
      } catch {
         dispatch({
            type: "rejected",
            payload: "There was an error loading to create new city...",
         });
      }
   }
   async function deleteCity(id: string) {
      dispatch({ type: "loading" });
      try {
         await axios.delete(`${BASE_URL}/cities/${id}`);
         dispatch({ type: "city/deleted", payload: id });
      } catch {
         dispatch({ type: "rejected", payload: "There was an error deleting city..." });
      }
   }

   const value: CitiesContextProps = {
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity,
   };

   return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

const useCities = () => {
   const context = useContext(CitiesContext);
   if (context === undefined) throw new Error("CitiesContext must be used within a CitiesProvider");
   return context;
};

export { CitiesProvider, useCities };
