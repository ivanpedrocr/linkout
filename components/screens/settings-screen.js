import React from "react";
import {
  Button,
  Center,
  Container,
  Pressable,
  Text,
  useColorMode,
  View,
} from "native-base";
import { ScreenContainer } from "../layout";
import { Icon } from "native-base";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const SettingsScreen = ({ navigation }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ScreenContainer>
      <Pressable _pressed={{ opacity: 20 }} onPress={toggleColorMode}>
        {colorMode === "dark" ? (
          <Icon as={FontAwesome5} name="moon" size={12} />
        ) : (
          <Icon as={FontAwesome5} name="sun" size={12} color="yellow.400" />
        )}
      </Pressable>
    </ScreenContainer>
  );
};

export default SettingsScreen;
