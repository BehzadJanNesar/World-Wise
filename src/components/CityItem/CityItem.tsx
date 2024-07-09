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
   const { cityName, emoji, date } = city;
   return (
      <li className={styles.cityItem}>
         <span className={styles.emoji}>{emoji}</span>
         <h3 className={styles.name}>{cityName}</h3>
         <time className={styles.date}>({formatDate(date)})</time>
         <button className={styles.deleteBtn}>&times;</button>
      </li>
   );
}

export default CityItem;
