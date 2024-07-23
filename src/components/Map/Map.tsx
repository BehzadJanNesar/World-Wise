import { useNavigate } from "react-router-dom";
import styles from "../Map/Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { City, ChangeCenterProps, GeolocationContext, Position } from "../../Types/Types";

function Map() {
   const { cities } = useCities();
   const [getMapPosition, setGetMapPosition] = useState<[number, number]>([
      35.72997744336261, 51.82487477231664,
   ]);
   const { isLoading, position, GetPosition }: GeolocationContext = useGeolocation();
   const [mapLat, mapLng] = useUrlPosition();

   useEffect(() => {
      if (mapLat && mapLng) setGetMapPosition([Number(mapLat), Number(mapLng)]);
   }, [mapLat, mapLng]);

   useEffect(() => {
      if (position) setGetMapPosition([Number(position.lat), Number(position.lng)]);
   }, [position]);

   return (
      <div className={styles.mapContainer}>
         {!position && (
            <Button type="position" onClick={GetPosition}>
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
            {cities.map((city: City) => {
               const { lat, lng } = city.position;
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
      click: (e: { latlng: Position }) => {
         navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
   });
   return null;
}

export default Map;
