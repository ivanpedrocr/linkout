import { Center } from "native-base";

export const ScreenContainer = ({ children, props }) => (
  <Center width="100%" height="100%" {...props}>
    {children}
  </Center>
);
