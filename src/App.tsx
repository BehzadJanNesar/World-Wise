import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedNavigate from "./pages/ProtectedNavigate";

function App() {
   return (
      <AuthProvider>
         <CitiesProvider>
            <BrowserRouter>
               <Routes>
                  <Route index element={<Homepage />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                     path="/app"
                     element={
                        <ProtectedNavigate>
                           <AppLayout />
                        </ProtectedNavigate>
                     }>
                     <Route index element={<Navigate replace to="cities" />} />
                     <Route path="cities" element={<CityList />} />
                     <Route path="cities/:id" element={<City />} />
                     <Route path="contries" element={<CountryList />} />
                     <Route path="form" element={<Form />} />
                     {/* <Route path="user" element> */}
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
               </Routes>
            </BrowserRouter>
         </CitiesProvider>
      </AuthProvider>
   );
}

export default App;
