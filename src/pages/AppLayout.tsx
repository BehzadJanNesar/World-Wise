import Map from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
   return (
      <div className={styles.app}>
         <Sidebar />
         <Map />
      </div>
   );
}
