import styles from "../CountryItem/CountryItem.module.css";

interface CountryItemProps {
   country: {
      emoji: string;
      country: string;
   };
   key: number;
}

function CountryItem({ country }: CountryItemProps) {
   return (
      <li className={styles.countryItem}>
         <span>{country.emoji}</span>
         <span>{country.country}</span>
      </li>
   );
}

export default CountryItem;
