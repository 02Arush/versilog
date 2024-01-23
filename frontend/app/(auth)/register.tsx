import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import theme from "./../../constants/theme";
import Button from "./../../components/Button";
import { registerUser as apiRegisterUser } from "./../../api/api";

const register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getErrMsg = () => {
    let errMsg = "";
    if (!firstName || !lastName)
      errMsg += "\nPlease enter valid first and last names";
    if (!email || email.length === 0) errMsg += "\nPlease enter a valid email";
    if (!password || password.localeCompare(confirmPassword) !== 0)
      errMsg += "\nPlease enter a valid and matching passwords";

    return errMsg;
  };
  
  async function handleRegisterClick() {
    // validate password/confirm password

    const e = getErrMsg();
    // if e.length > 0
    if (e.length > 0) {
      alert(e);
    } else {
      const status = await apiRegisterUser(
        firstName,
        lastName,
        email,
        password
      );
      if (status === 200) {
        alert("Successfully registered user");
        router.replace("/login");
      } else if (status === 1062) {
        alert("Registration Failed! This email is already registered.");
      } else {
        alert("Database error! STATUS CODE: " + status);
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        ...theme.pageContainer,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          ...theme.centerView,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            ...theme.headerText,
          }}
        >
          Register for Versilogs
        </Text>
        <View style={{ marginTop: 30, marginBottom: 10, width: 200 }}>
          <TextInput
            style={{ ...theme.bodyText, ...theme.textInput }}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="grey"
          />
          <TextInput
            style={{ ...theme.bodyText, ...theme.textInput }}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="grey"
          />
          <TextInput
            style={{ ...theme.bodyText, ...theme.textInput }}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="grey"
          />
          <TextInput
            style={{ ...theme.bodyText, ...theme.textInput }}
            onChangeText={setPassword}
            secureTextEntry
            value={password}
            placeholder="Password"
            placeholderTextColor="grey"
          />
          <TextInput
            style={{ ...theme.bodyText, ...theme.textInput }}
            onChangeText={setConfirmPassword}
            secureTextEntry
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
          />
        </View>

        <Button
          text="Submit"
          sx={{ marginTop: 5, width: 200 }}
          onPress={() => {
            handleRegisterClick();
          }}
        />
        <Button
          text="Back"
          sx={{ marginTop: 5, width: 200 }}
          href="/"
          
        />
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  input: {},
});
