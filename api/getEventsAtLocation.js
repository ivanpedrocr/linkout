import { getDatabase, get, ref } from "firebase/database";

export const getEventsAtLocation = async (locationId, onValue, onError) => {
  const db = getDatabase();
  get(ref(db, `events/${locationId}`))
    .then((value) => {
      onValue(parseEventsData(value.val()));
    })
    .catch(onError);
};

const parseEventsData = (eventsObject) => {
  if (eventsObject) {
    return Object.keys(eventsObject).map((key) => ({
      id: key,
      ...eventsObject[key],
    }));
  } else return [];
};
