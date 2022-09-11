import { Spinner } from "native-base";
import React, { useEffect } from "react";
import { getLocation } from "../../api/getLocation";
import { useLocationContext } from "../context/location-context";
import { ScreenContainer } from "../layout";

const LoadingScreen = ({ navigation }) => {
  const { location, setLocation, setErr } = useLocationContext();
  useEffect(() => {
    getLocation((location) => {
      setLocation(location);
    }, setErr);
  }, []);
  return (
    <ScreenContainer>
      <Spinner size="lg" />
    </ScreenContainer>
  );
};

export default LoadingScreen;
