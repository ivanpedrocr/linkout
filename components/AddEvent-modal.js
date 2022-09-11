import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  Center,
  HStack,
  IconButton,
  Input,
  Modal,
  Popover,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
  Heading,
} from "native-base";
import DatePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { pushNewEvent } from "../api/pushNewEvent";
import { getEventsAtLocation } from "../api/getEventsAtLocation";
import format from "date-fns/format";

const AddEventModal = ({ selectedPlace, setSelectedPlace, colorMode }) => {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState();
  const [eventType, setEventType] = useState();
  const [placeEvents, setPlaceEvents] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (selectedPlace) {
      getEventsAtLocation(selectedPlace?.id, (value) => {
        setPlaceEvents(value);
      });
    }
  }, [selectedPlace?.id]);
  return (
    <Modal isOpen={!!selectedPlace} onClose={() => setSelectedPlace(undefined)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header marginRight={12}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="md">{selectedPlace?.name}</Heading>
            <Popover
              onClose={() => {
                setName(undefined);
                setTime(new Date());
                setEventType(undefined);
              }}
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
                  <TouchableOpacity
                    onPress={() => {
                      if (name && time && eventType) {
                        pushNewEvent(
                          { name, time: time.toISOString(), eventType },
                          selectedPlace.id,
                          (pushKey) => {
                            setPlaceEvents((prevState) => [
                              ...prevState,
                              { id: pushKey, name, time, eventType },
                            ]);
                          }
                        );
                      }
                    }}
                  >
                    <Text>Add Event</Text>
                  </TouchableOpacity>
                </Popover.Header>
                <Box>
                  <VStack>
                    <Input
                      flex={1}
                      placeholder="Name"
                      h="12"
                      onChangeText={(t) => {
                        setName(t);
                      }}
                      value={name}
                    />
                    <Input
                      flex={1}
                      placeholder="Event Type"
                      h="12"
                      onChangeText={(text) => {
                        setEventType(text);
                      }}
                      value={eventType}
                    />
                    <DatePicker
                      onChange={(e, time) => {
                        setTime(time);
                      }}
                      themeVariant={colorMode}
                      textColor={useColorModeValue(
                        theme.colors.darkText,
                        theme.colors.lightText
                      )}
                      display="spinner"
                      value={time}
                      mode="time"
                      placeholderText="Time"
                    />
                  </VStack>
                </Box>
              </Popover.Content>
            </Popover>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <VStack alignItems="center" space={2}>
            {placeEvents.map((event) => {
              return (
                <Center
                  w="100%"
                  borderRadius={8}
                  key={event?.name + event?.time}
                  backgroundColor={theme.colors.primary[500]}
                  padding={2}
                >
                  <Text bold color="white">
                    {event?.name}
                  </Text>
                  <Text color="white">
                    {format(new Date(event?.time), "EEE, MMM dd, HH:mm")}
                  </Text>
                  <Text color="white">{event?.eventType}</Text>
                </Center>
              );
            })}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddEventModal;
