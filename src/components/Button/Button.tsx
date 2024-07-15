import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
   children: React.ReactNode;
   type: string;
   onclick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, type, onclick }: ButtonProps) {
   return (
      <button onClick={onclick} className={`${styles.btn} ${styles[type]}`}>
         {children}
      </button>
   );
}

export default Button;
