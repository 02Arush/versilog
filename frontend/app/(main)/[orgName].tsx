import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import theme from "./../../constants/theme";

const orgName = () => {
  const { orgName } = useLocalSearchParams();
  return (
    <View style={{ ...theme.pageContainer }}>
      <Text>Manage {orgName}</Text>
    </View>
  );
};

export default orgName;

const styles = StyleSheet.create({});
