import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Map/Map.module.css";

function Map() {
   const navigate = useNavigate();
   const [_searchParams, setSearchParams] = useSearchParams();
   return (
      <div className={styles.mapContainer} onClick={() => navigate("form")}>
         create a map in this here
         <button
            onClick={() => {
               setSearchParams({ lat: "30", lng: "50" });
            }}>
            Change Position
         </button>
      </div>
   );
}

export default Map;
