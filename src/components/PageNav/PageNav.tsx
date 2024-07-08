import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "../Logo/Logo";

export default function PageNav() {
   return (
      <nav className={style.nav}>
         <Logo />
         <ul>
            <li>
               <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
               <NavLink to="/product">Prdouct</NavLink>
            </li>
            <li>
               <NavLink to="/login" className={style.ctaLink}>
                  Login
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
