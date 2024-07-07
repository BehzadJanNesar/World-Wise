import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

function App() {
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Homepage />} />
               <Route path="/app" element={<AppLayout />} />
               <Route path="/product" element={<Product />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/login" element={<Login />} />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
