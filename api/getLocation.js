import * as Location from "expo-location";

export const getLocation = async (onLocation, onReject) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    onReject?.("Permission Denied");
  } else {
    const location = await Location.getCurrentPositionAsync();
    onLocation?.(location);
  }
};
