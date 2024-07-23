import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
   children: React.ReactNode;
   type: string;
   onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, type, onClick }: ButtonProps) {
   return (
      <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
         {children}
      </button>
   );
}

export default Button;
