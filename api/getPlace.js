import { GOOGLE_MAPS_API_KEY } from "@env";

export const getPlace = async (address, onFetch, onError) => {
  if (address) {
    const queryVariables = {
      fields: ["formatted_address", "geometry", "name", "type"],
      input: address,
      inputtype: "textquery",
      key: GOOGLE_MAPS_API_KEY,
    };
    const parsedVariables = new URLSearchParams(queryVariables).toString();
    const requestURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${parsedVariables}`;
    const res = await fetch(requestURL);
    res
      .json()
      .then((place) => {
        onFetch?.(place.candidates[0]);
      })
      .catch((error) => {
        console.log({ error });
        onError?.(error);
      });
  }
};
