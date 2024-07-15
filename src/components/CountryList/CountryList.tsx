import styles from "../CountryList/CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

interface City {
   country: string;
   emoji: string;
}

interface CountryListProps {
   cities: City[];
   isLoading: boolean;
}

function CountryList({ cities, isLoading }: CountryListProps) {
   if (isLoading) return <Spinner />;

   const countries = cities.reduce<{ country: string; emoji: string }[]>((arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
         return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
   }, []);

   if (!cities.length)
      return <Message message="Add your first city by clicking on a city on the map" />;
   return (
      <ul className={styles.countryList}>
         {countries.map((country, index: number) => (
            <CountryItem key={index} country={country} />
         ))}
      </ul>
   );
}

export default CountryList;
