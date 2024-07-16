import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function ButtonBack() {
   const navigate = useNavigate();
   return (
      <Button
         type={"back"}
         onclick={(e) => {
            e.preventDefault();
            navigate(-1);
         }}>
         &larr; Back
      </Button>
   );
}

export default ButtonBack;
