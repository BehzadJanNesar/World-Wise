import { Link } from "react-router-dom";
import styles from "../CityItem/CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
import type { City } from "../../Types/Types";

const formatDate = (date: string) =>
   new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
   }).format(new Date(date));

interface CityItemProps {
   city: City
}

function CityItem({ city }: CityItemProps) {
   const { currentCity, deleteCity } = useCities();
   const { cityName, emoji, date, id, position } = city;
   let lat = position.lat;
   let lng = position.lng;

   function handleDeleteCity(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      deleteCity(id);
   }
   function isCity(city: any): city is City {
      return 'id' in city;
   }

   return (
      <li>
         <Link
            className={`${styles.cityItem} ${
              isCity(currentCity) && currentCity.id === id ? styles["cityItem--active"] : ""
            }`}
            to={`${id}?lat=${lat}&lng=${lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn} onClick={handleDeleteCity}>
               &times;
            </button>
         </Link>
      </li>
   );
}

export default CityItem;
