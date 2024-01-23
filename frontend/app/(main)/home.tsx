import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import theme from "./../../constants/theme";
import React, { useEffect, useState } from "react";
import FloatingButton from "../../components/FloatingButton";
import { Link } from "expo-router";
import Button from "../../components/Button";

const home = () => {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    console.log("using effect");
    
  }, []);

  return (
    <SafeAreaView style={theme.pageContainer}>
      {/* Greeting */}
      <View style={styles.greetingDiv}>
        <View>
          <Text style={theme.headerText}>Welcome user</Text>
          <Text style={theme.bodyText}>View your activity log</Text>
        </View>
        <Button text="Sign Out" href="/" />
      </View>

      {/* Logs */}
      <View style={styles.historyDiv}>
        <Text style={theme.bodyText}>Your activity</Text>
      </View>

      <FloatingButton href="/log_hours" />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  greetingDiv: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },

  historyDiv: {
    borderWidth: 1,
    flex: 4,
    ...theme.centerView,
  },
});
