import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Map/Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

function Map() {
   const navigate = useNavigate();
   const [getPosition, setGetPosition] = useState([35.793502295637026, 51.506035711611204]);
   const [_searchParams, setSearchParams] = useSearchParams();
   return (
      <div className={styles.mapContainer}>
         <MapContainer className={styles.map} center={getPosition} zoom={13} scrollWheelZoom={true}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <Marker position={getPosition}>
               <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
            </Marker>
         </MapContainer>
      </div>
   );
}

export default Map;
