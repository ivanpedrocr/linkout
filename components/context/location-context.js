import React, { useContext, useState } from "react";

const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState();
  const [places, setPlaces] = useState();
  const [err, setErr] = useState();
  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        places,
        setPlaces,
        err,
        setErr,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
