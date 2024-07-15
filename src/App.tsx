import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";

const BASE_URL = "http://localhost:9000";

function App() {
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

   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route index element={<Homepage />} />
               <Route path="/product" element={<Product />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/login" element={<Login />} />
               <Route path="/app" element={<AppLayout />}>
                  <Route index element={<CityList cities={cities} isLoading={loading} />} />
                  <Route path="cities" element={<CityList cities={cities} isLoading={loading} />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route
                     path="contries"
                     element={<CountryList cities={cities} isLoading={loading} />}
                  />
                  <Route path="form" element={<Form />} />
               </Route>
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
