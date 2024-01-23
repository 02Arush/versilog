import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import theme from "./../../constants/theme";
import Button from "./../../components/Button";
import { SvgUri } from "react-native-svg";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import { attemptLogin } from "../../api/api";
import { router } from "expo-router";
import { saveData, loadData } from "./../../api/storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginButtonClick() {
    if (email.length === 0 || password.length === 0) {
      alert("PLease fill out all fields");
    } else {
      const response = await attemptLogin(email, password);
      switch (response.status) {
        case 200:
          // Get login token?
          await saveData("authToken", JSON.stringify(response.authToken));
          router.replace("/home");
          break;
        case 404:
          alert("Email address not found!");
          break;
        case 400:
          alert("Invalid password!");
          break;
        default:
          alert("Server error! Try again later");
          break;
      }
    }
    // Try to login (get the bool from the api)
    // if the bool returns true, go to the login screen
    // else if it returns false, say passwords don't match
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
          Login to Versilogs
        </Text>
        <View style={{ marginTop: 30, marginBottom: 10, width: 200 }}>
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
        </View>

        <Button
          text="Login"
          sx={{ marginTop: 5, width: 200 }}
          onPress={() => {
            handleLoginButtonClick();
          }}
        />
        <Text style={{ ...theme.bodyText }}>
          New user?{" "}
          <Link href="/register" style={{ textDecorationLine: "underline" }}>
            Register
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  input: {},
});
