import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  Box,
  Button,
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
import { getLocation } from "../../api/getLocation";
import { getNearbyPlaces } from "../../api/getNearbyPlaces";
import { useLocationContext } from "../context/location-context";
import DatePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";

const MapScreen = () => {
  const { places, location, setPlaces, setErr } = useLocationContext();
  const [selectedPlace, setSelectedPlace] = useState();
  const [isOpenTimePicker, setIsOpenTimePicker] = useState();
  const [date, setDate] = useState(new Date());
  const theme = useTheme();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (location) {
      getNearbyPlaces(
        setPlaces,
        setErr,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        1000
      );
    }
  }, []);
  return (
    <>
      <Modal
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header marginRight={12}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>{selectedPlace?.name}</Text>
              <Popover
                trigger={(props) => (
                  <IconButton
                    {...props}
                    _icon={{ as: AntDesign, name: "plus" }}
                  />
                )}
              >
                <Popover.Content
                  bgColor={useColorModeValue("white", theme.colors.dark[100])}
                  w="56"
                >
                  <Popover.CloseButton />
                  <Popover.Header>
                    <TouchableOpacity>
                      <Text>Add Event</Text>
                    </TouchableOpacity>
                  </Popover.Header>
                  <Box>
                    <VStack>
                      <Input flex={1} placeholder="Name" h="12" />
                      <Input flex={1} placeholder="Event Type" h="12" />
                      <DatePicker
                        themeVariant={colorMode}
                        textColor={useColorModeValue(
                          theme.colors.darkText,
                          theme.colors.lightText
                        )}
                        display="spinner"
                        value={date}
                        mode="time"
                        open={isOpenTimePicker}
                        placeholderText="Time"
                      />
                    </VStack>
                  </Box>
                </Popover.Content>
              </Popover>
            </HStack>
          </Modal.Header>
          <Modal.Body>
            <VStack alignItems="center">
              {selectedPlace?.users?.map((user) => (
                <Center key={user.name + user.time}>
                  <Text>{user.name}</Text>
                  <Text>{user.time}</Text>
                  <Text>{user.eventType}</Text>
                </Center>
              ))}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {location?.coords && (
        <>
          <MapView
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
            {places?.length &&
              places.map((place) => {
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
        </>
      )}
    </>
  );
};

export default MapScreen;
