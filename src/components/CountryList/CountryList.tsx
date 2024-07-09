import styles from "../CountryList/CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Sppiner from "../Spinner/Spinner";

interface CountryListProps {
   cities: [];
   isLoading: boolean;
}

function CountryList({ cities, isLoading }: CountryListProps) {
   if (isLoading) return <Sppiner />;

   const filterCountry = cities.reduce((arr, city) => {
      return arr;
   }, []);
   console.log(filterCountry);

   if (!cities.length)
      return <Message message="Add your first city by clicking on a city on the map" />;
   return (
      <ul className={styles.countryList}>
         {filterCountry.map((country, index: number) => (
            <CountryItem index={index} country={country} />
         ))}
      </ul>
   );
}

export default CountryList;
