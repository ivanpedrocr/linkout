import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/map-screen";
import LocationsScreen from "../screens/locations-screen";
import { useColorMode, useTheme } from "native-base";
import { getThemeColors } from "../theme/theme";
import SettingsScreen from "../screens/settings-screen";
import { useLocationContext } from "../context/location-context";
import LoadingScreen from "./LoadingScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icon } from "native-base";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const { location } = useLocationContext();
  return (
    <NavigationContainer
      theme={{
        colors: getThemeColors(theme, colorMode),
        dark: colorMode === "dark" ? true : false,
      }}
    >
      {location ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarIcon: () => (
                <Icon name="room" size={28} as={MaterialIcons} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => (
                <Icon name="settings" size={28} as={MaterialIcons} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
