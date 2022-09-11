import { Factory } from "native-base";
import Picker from "@react-native-community/datetimepicker";

export const DatePicker = (props) => {
  const NBPicker = Factory(Picker);
  return <NBPicker {...props} />;
};
