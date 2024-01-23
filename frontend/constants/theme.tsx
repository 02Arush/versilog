import { StyleSheet } from "react-native";
import Colors from "./Colors";

const baseFontSize = 16;
const headerFontSize = baseFontSize + 4;
const radius = 8;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 8,
    minWidth: 350,
  },

  centerView: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: headerFontSize,
  },

  bodyText: {
    fontSize: baseFontSize,
  },

  textInput: {
    fontSize: baseFontSize,
    borderWidth: 0,
    padding: 10,
    margin: 2,
    borderRadius: radius,
    backgroundColor: Colors.grey4,
    
  },

  card: {
    backgroundColor: Colors.grey3,
    borderRadius: radius,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadow: {
    boxShadow: "2px 4px 2.5px 0px rgba(0, 0, 0, 0.25)",
  },
});

export default styles;
