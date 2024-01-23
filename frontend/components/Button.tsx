import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import theme from "../constants/theme";
import { router } from "expo-router";

type props = {
  text: string;
  href?: any;
  sx?: {};
  onPress?: any;
};
const Button = ({ text = "", href, sx = {}, onPress = () => {} }: props) => {
  const Touchable = () => {
    return (
      <TouchableOpacity
        style={{ ...theme.button, ...sx }}
        onPress={() => {
          onPress();
          // If button is to also be used as a link
          if (href) {
            router.push(href);
          }
        }}
      >
        <Text style={{ ...theme.bodyText }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return <Touchable />;
};

export default Button;
