import React from "react";
import { NativeBaseProvider } from "native-base";
import Navigation from "./components/navigation/Navigation";
import { LocationContextProvider } from "./components/context/location-context";
import { initializeFirebase } from "./api/firebase";
import { getApps } from "firebase/app";

export default function App() {
  if (!getApps().length) {
    initializeFirebase();
  }
  return (
    <NativeBaseProvider>
      <LocationContextProvider>
        <Navigation />
      </LocationContextProvider>
    </NativeBaseProvider>
  );
}
