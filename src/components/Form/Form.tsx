// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../ButtonBack/ButtonBack";
import axios from "axios";
import { useUrlPosition } from "../../hooks/useUrlPosition";

export function convertToEmoji(countryCode: string): string {
   const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
   return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
   const navigate = useNavigate();
   const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
   const [cityName, setCityName] = useState<string>("");
   const [country, setCountry] = useState<string>("");
   const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
   const [notes, setNotes] = useState("");
   const [lat, lng] = useUrlPosition();

   useEffect(() => {
      async function getCityData() {
         try {
            const res = await axios.get(`${BASE_URL}?lat=${lat}&lng=${lng}`);
            const data = await res.data;
            setCityName(data.city);
            setCountry(data.countryName);
         } catch (err) {
         } finally {
            setIsLoadingGeocoding(false);
         }
      }
      getCityData();
   }, [lat, lng]);

   return (
      <form className={styles.form}>
         <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
            {/* <span className={styles.flag}>{emoji}</span> */}
         </div>

         <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <input id="date" onChange={(e) => setDate(e.target.value)} value={date} />
         </div>

         <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
         </div>

         <div className={styles.buttons}>
            <Button type={"primary"} onclick={() => {}}>
               Add
            </Button>
            <ButtonBack />
         </div>
      </form>
   );
}

export default Form;
