import { useCities } from "../../contexts/CitiesContext";
import CityItem from "../CityItem/CityItem";
import styles from "../CityList/CityList.module.css";
import Message from "../Message/Message";
import Sppiner from "../Spinner/Spinner";
import type { City } from "../../Types/Types";

interface CityListContextType {
   isLoading: boolean;
   cities: City[];
}

function CityList() {
   const { isLoading, cities }: CityListContextType = useCities();
   if (isLoading) return <Sppiner />;
   if (!cities.length)
      return <Message message="Add your first city by clicking on a city on the map" />;
   return (
      <ul className={styles.cityList}>
         {cities.map((city, index: number) => (
            <CityItem key={index} city={city} />
         ))}
      </ul>
   );
}

export default CityList;
