import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../ButtonBack/ButtonBack";
import axios from "axios";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../../contexts/CitiesContext";
import { FormData, GeocodingData } from "../../Types/Types";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
   const { createCity, isLoading } = useCities();
   const navigate = useNavigate();
   const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
   const [cityName, setCityName] = useState<string>("");
   const [country, setCountry] = useState<string>("");
   const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
   const [notes, setNotes] = useState<string>("");
   const [emoji, setEmoji] = useState<string>("");
   const [geocodingError, setGeocodingError] = useState<string>("");
   const [lat, lng] = useUrlPosition();

   useEffect(() => {
      if (!lat || !lng) return;

      const getCityData = async () => {
         try {
            setIsLoadingGeocoding(true);
            setGeocodingError("");
            const res = await axios.get<GeocodingData>(
               `${BASE_URL}?latitude=${lat}&longitude=${lng}`
            );
            const data = res.data;

            if (!data.countryName) {
               throw new Error("That doesn't seem to be a city. Click somewhere else!");
            }

            setCityName(data.city || data.locality || "");
            setCountry(data.countryName);
            setEmoji(convertToEmoji(data.countryCode));
         } catch (err) {
            setGeocodingError(err instanceof Error ? err.message : "An error occurred");
         } finally {
            setIsLoadingGeocoding(false);
         }
      };

      getCityData();
   }, [lat, lng]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!cityName || !date) return;

      const newCityItem: FormData = {
         cityName,
         country,
         emoji,
         date,
         notes,
         position: { lat, lng },
      };

      await createCity(newCityItem);
      navigate("/app/cities");
   };

   if (!lat || !lng) return <Message message="Start by clicking somewhere on the map..." />;

   if (isLoadingGeocoding) return <Spinner />;
   if (geocodingError) return <Message message={geocodingError} />;

   return (
      <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
         <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
               id="cityName"
               type="text"
               onChange={(e) => setCityName(e.target.value)}
               value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
         </div>

         <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <DatePicker
               id="date"
               selected={new Date(date.toString())}
               onChange={(date: Date | null) =>
                  setDate(date ? date.toISOString().slice(0, 10) : "")
               }
               dateFormat="dd/MM/yyyy"
            />
         </div>

         <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
         </div>

         <div className={styles.buttons}>
            <Button type="primary" onclick={handleSubmit}>
               Add
            </Button>
            <ButtonBack />
         </div>
      </form>
   );
}

export default Form;

function convertToEmoji(countryCode: string): string {
   const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
   return String.fromCodePoint(...codePoints);
}
