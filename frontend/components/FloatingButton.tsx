import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../constants/theme";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

const FloatingButton = ({ size = 50, iconName = "add-sharp", href = "/" }) => {
  const insets = useSafeAreaInsets();

  return (
    <Link
      asChild
      href={href as any}
      style={{
        position: "absolute",
        bottom: insets.bottom, // 20 is the distance from the bottom
        right: insets.right, // 20 is the distance from the right
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: size / 2, // ensures the button is perfectly round
          width: size,
          height: size,
          ...theme.centerView,
          ...theme.shadow,
          backgroundColor: Colors.grey4,
        }}
      >
        <Ionicons name={iconName as any} size={size * 0.6} color="black" />
      </TouchableOpacity>
    </Link>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({}); // Keep this if you plan to add styles later
