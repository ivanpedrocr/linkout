import { getDatabase, push, ref } from "firebase/database";

export const pushNewEvent = async (event, locationId, onFulfill, onError) => {
  if (event && locationId) {
    const db = getDatabase();
    push(ref(db, `events/${locationId}/`), event)
      .then((val) => {
        onFulfill(val.key);
      })
      .catch(onError);
  }
};
