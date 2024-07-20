import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Map/Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

interface CityTypes {
   id: number;
   notes: string;
   position: {
      lat: string;
      lng: string;
   };
}

interface ChangeCenterProps {
   position: [number, number];
}

function Map() {
   const { cities } = useCities();
   const [getMapPosition, setGetMapPosition] = useState([35.72997744336261, 51.82487477231664]);
   const { isLoading, position, GetPosition } = useGeolocation();
   const [mapLat, mapLng] = useUrlPosition();

   useEffect(() => {
      if (mapLat && mapLng) setGetMapPosition([Number(mapLat), Number(mapLng)]);
   }, [mapLat, mapLng]);

   useEffect(() => {
      if (position) setGetMapPosition([position.lat, position.lng]);
   }, [position]);
   return (
      <div className={styles.mapContainer}>
         {!position && (
            <Button type="position" onclick={GetPosition}>
               {isLoading ? "is loading..." : "Get your current position"}
            </Button>
         )}
         <MapContainer
            className={styles.map}
            center={getMapPosition}
            zoom={13}
            scrollWheelZoom={true}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map((city: CityTypes) => {
               const { lat } = city.position;
               const { lng } = city.position;
               return (
                  <Marker position={[lat, lng]} key={city.id}>
                     <Popup>{city.notes}</Popup>
                  </Marker>
               );
            })}
            <ChangeCenter position={getMapPosition} />
            <DetectClick />
         </MapContainer>
      </div>
   );
}

function ChangeCenter({ position }: ChangeCenterProps) {
   const map = useMap();
   map.setView(position);
   return null;
}
function DetectClick() {
   const navigate = useNavigate();
   useMapEvents({
      click: (e: any[]) => {
         navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
   });
   return null;
}

export default Map;
