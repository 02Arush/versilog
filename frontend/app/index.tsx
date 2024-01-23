import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import theme from "../constants/theme";
import React from "react";
import { Link, router } from "expo-router";
import Button from "./../components/Button";

const index = () => {
  return (
    <SafeAreaView style={theme.pageContainer}>
      <View style={styles.nav}>
        <Text style={theme.headerText}>Welcome to Versilogs</Text>
        <View style={styles.navButtons}>
          <Button text="Login" sx={{ marginHorizontal: 2 }} href="/login" />
          <Button
            href="/register"
            text="Register"
            sx={{ marginHorizontal: 2 }}
          />
        </View>
      </View>
      <View style={{ ...theme.centerView, flex: 1 }}>
        <Text style={theme.bodyText}>Other Body Content</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navButtons: {
    flexDirection: "row",
  },
});
