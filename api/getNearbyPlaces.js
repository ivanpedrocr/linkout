import { GOOGLE_MAPS_API_KEY } from "@env";

export const getNearbyPlaces = async (onFetch, onError, location, radius) => {
  if (location.latitude && location.longitude) {
    const queryVariables = {
      fields: ["formatted_address", "geometry", "name", "type"],
      keyword: "parks or fields",
      location: `${location.latitude},${location.longitude}`,
      radius,
      key: GOOGLE_MAPS_API_KEY,
    };
    const parsedVariables = new URLSearchParams(queryVariables).toString();
    const requestURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parsedVariables}`;
    const res = await fetch(requestURL);
    res
      .json()
      .then((places) => {
        if (onFetch) {
          onFetch(parseSearchResults(places.results));
        }
      })
      .catch((error) => {
        onError?.(error);
      });
  }
};

const parseSearchResults = (results) => {
  return results.map((place) => ({
    location: {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    },
    address: place.vicinity,
    name: place.name,
    id: place.place_id,
  }));
};
