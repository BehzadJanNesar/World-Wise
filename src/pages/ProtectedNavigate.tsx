import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

interface UseAuthProps {
   isAuthenticated: boolean;
}

function ProtectedNavigate({ children }) {
   const { isAuthenticated }: UseAuthProps = useAuth();
   const navigate = useNavigate();

   useEffect(
      function () {
         if (!isAuthenticated) navigate("/");
      },
      [isAuthenticated, navigate]
   );

   return isAuthenticated ? children : null;
}

export default ProtectedNavigate;
