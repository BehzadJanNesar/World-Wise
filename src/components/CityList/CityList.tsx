import { useCities } from "../../contexts/CitiesContext";
import CityItem from "../CityItem/CityItem";
import styles from "../CityList/CityList.module.css";
import Message from "../Message/Message";
import Sppiner from "../Spinner/Spinner";

interface CityListContextType {
   loading: boolean;
   cities: any[];
}

function CityList() {
   const { loading, cities }: CityListContextType = useCities();
   if (loading) return <Sppiner />;
   if (!cities.length)
      return <Message message="Add your first city by clicking on a city on the map" />;
   return (
      <ul className={styles.cityList}>
         {cities.map((city, index: number) => (
            <CityItem index={index} city={city} />
         ))}
      </ul>
   );
}

export default CityList;
