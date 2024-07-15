import { Link } from "react-router-dom";
import styles from "../CityItem/CityItem.module.css";

const formatDate = (date: string) =>
   new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
   }).format(new Date(date));

interface CityItemProps {
   city: {
      cityName: string;
      country: string;
      date: string;
      emoji: string;
      id: string;
      notes: string;
      position: {
         lat: string;
         lng: string;
      };
   };
   index: number;
}

function CityItem({ city }: CityItemProps) {
   const { cityName, emoji, date, id, position } = city;
   let lat = position.lat;
   let lng = position.lng;
   return (
      <li>
         <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn}>&times;</button>
         </Link>
      </li>
   );
}

export default CityItem;
