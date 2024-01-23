import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import theme from "./../constants/theme";

type props = {
  sx?: {};
};
const ImagePickerBtn = ({ sx }: props) => {
  const [image, setImage] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  };
  return (
    <Button
      text="Image Picker"
      onPress={() => pickImage()}
      sx={{ ...theme.button, ...sx }}
    />
  );
};

export default ImagePickerBtn;

const styles = StyleSheet.create({});
