import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Box,
  Center,
  HStack,
  IconButton,
  Input,
  Modal,
  Popover,
  SectionList,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import { getNearbyPlaces } from "../../api/getNearbyPlaces";
import { useLocationContext } from "../context/location-context";
import DatePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { pushNewEvent } from "../../api/pushNewEvent";
import { getEventsAtLocation } from "../../api/getEventsAtLocation";
import format from "date-fns/format";
import { getPlace } from "../../api/getPlace";
import AddEventModal from "../AddEvent-modal";

const MapScreen = () => {
  const { places, location, setPlaces, setErr, setLocation } =
    useLocationContext();
  const [selectedPlace, setSelectedPlace] = useState();
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [searchWords, setSearchWords] = useState();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AddEventModal
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        theme={theme}
        colorMode={colorMode}
      />
      {!location?.coords ? null : (
        <>
          <MapView
            showsScale
            onRegionChangeComplete={(region) => {
              setLocation({
                coords: region,
              });
            }}
            mapPadding={{ left: 8, right: 8, top: 16 }}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: location?.coords?.latitudeDelta || 0.05,
              longitudeDelta: location?.coords?.longitudeDelta || 0.05,
            }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            style={{
              width: Dimensions.get("window").width,
              width: Dimensions.get("window").height,
              ...StyleSheet.absoluteFillObject,
            }}
          >
            {!places?.length
              ? null
              : places.map((place) => {
                  return (
                    <Marker
                      identifier={place.id}
                      coordinate={place.location}
                      title={place.name}
                      key={place.id}
                      onPress={(e) => {
                        setSelectedPlace(
                          places.find((place) => place.id === e.nativeEvent.id)
                        );
                      }}
                    />
                  );
                })}
          </MapView>
          <HStack
            justifyContent="space-between"
            marginTop={16}
            ml={16}
            mr={16}
            alignSelf="center"
            bgColor={theme.colors.dark[100]}
            opacity={60}
            padding={0}
            borderRadius={12}
          >
            <Input
              variant="unstyled"
              color="white"
              onChangeText={(text) => setSearchWords(text)}
              value={searchWords}
              w="100%"
              size="lg"
            />
            <IconButton
              _icon={{
                as: AntDesign,
                name: "search1",
              }}
              onPress={() => {
                if (searchWords) {
                  getPlace(searchWords, (place) => {
                    setLocation({
                      coords: {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                      },
                    });
                    getNearbyPlaces(
                      setPlaces,
                      setErr,
                      {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                      },
                      (location?.coords?.latitudeDelta || 0.05) * 70 * 1000
                    );
                  });
                } else {
                  getNearbyPlaces(
                    setPlaces,
                    setErr,
                    {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    },
                    (location?.coords?.latitudeDelta || 0.05) * 70 * 1000
                  );
                }
              }}
            />
          </HStack>
        </>
      )}
    </>
  );
};

export default MapScreen;
