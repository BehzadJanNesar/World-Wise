import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import ButtonBack from "../ButtonBack/ButtonBack";

interface CityType {
   cityName: string;
   emoji: string;
   date: string;
   notes?: string;
}

const formatDate = (date: string) => {
   const parsedDate = new Date(date);
   if (isNaN(parsedDate.getTime())) {
      return "Invalid Date";
   }
   return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
   }).format(parsedDate);
};

function City() {
   const { id } = useParams<{ id: string }>();
   const { currentCity, getCity, loading } = useCities();

   useEffect(() => {
      if (id) {
         getCity(id);
      }
   }, [id]);

   if (!currentCity) return <p>City not found</p>;

   if (loading) return <Spinner />;
   const { cityName, emoji, date, notes } = currentCity as CityType;

   return (
      <div className={styles.city}>
         <div className={styles.row}>
            <h6>City name</h6>
            <h3>
               <span>{emoji}</span> {cityName}
            </h3>
         </div>

         <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date)}</p>
         </div>

         {notes && (
            <div className={styles.row}>
               <h6>Your notes</h6>
               <p>{notes}</p>
            </div>
         )}

         <div className={styles.row}>
            <h6>Learn more</h6>
            <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
               Check out {cityName} on Wikipedia &rarr;
            </a>
         </div>

         <div>
            <ButtonBack />
         </div>
      </div>
   );
}

export default City;
