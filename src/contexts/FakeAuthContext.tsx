import { createContext, useContext, useReducer } from "react";

const initialState = {
   user: null,
   isAuthenticated: false,
};
function reducer(state, action) {
   switch (action.type) {
      case "login": {
         return { ...state, user: action.payload, isAuthenticated: true };
      }
      case "logout": {
         return { ...state, user: {}, isAuthenticated: false };
      }
   }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
   const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);
   const FAKE_USER = {
      name: "Behzad",
      email: "behzad@example.com",
      password: "qwerty",
      avatar: "https://i.pravatar.cc/100?u=zz",
   };

   function login(email: string, password: string) {
      if (email === FAKE_USER.email && password === FAKE_USER.password)
         dispatch({ type: "login", payload: FAKE_USER });
   }
   function logout() {
      dispatch({ type: "logout" });
   }

   const value = {
      user,
      isAuthenticated,
      login,
      logout,
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) throw new Error("AuthContext was used outside the provider...");
   return context;
}

export { useAuth, AuthProvider };
