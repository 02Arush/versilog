import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "./../../../constants/theme";
import Colors from "../../../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import Button from "./../../../components/Button";

const join_org = () => {
  return (
    <View style={{ ...theme.pageContainer, ...theme.centerView }}>
      <View style={styles.outerCard}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View>
            <Text style={theme.bodyText}>Enter organization Access Code</Text>
            <TextInput style={theme.textInput} />
          </View>
          <Text style={{ ...theme.bodyText, marginVertical: 12 }}>OR</Text>
          <View>
            <Text style={theme.bodyText}>Enter Organization's Unique ID</Text>
            <TextInput style={theme.textInput} />
          </View>
          <Button text="Submit" sx={{ marginTop: 16 }} />
        </View>
      </View>
    </View>
  );
};

export default join_org;

const styles = StyleSheet.create({
  outerCard: {
    ...theme.card,
    ...theme.shadow,
    flexDirection: "column",
    backgroundColor: Colors.grey3,
    width: 300,
    alignItems: "center",
    height: "90%",
    justifyContent: 'center',
  },
});
