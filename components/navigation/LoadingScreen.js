import { Spinner } from "native-base";
import React, { useEffect } from "react";
import { getLocation } from "../../api/getLocation";
import { useLocationContext } from "../context/location-context";
import { ScreenContainer } from "../layout";
import { getNearbyPlaces } from "../../api/getNearbyPlaces";

const LoadingScreen = ({ navigation }) => {
  const { setLocation, setPlaces, setErr } = useLocationContext();
  useEffect(() => {
    getLocation(
      (location) => {
        setLocation(location);
        getNearbyPlaces(
          setPlaces,
          setErr,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          0.05 * 50 * 1000
        );
      },
      () =>
        setLocation({
          coords: {
            latitude: 25.79837217989272,
            longitude: -80.12752582010728,
          },
        })
    );
  }, []);
  return (
    <ScreenContainer>
      <Spinner size="lg" />
    </ScreenContainer>
  );
};

export default LoadingScreen;
