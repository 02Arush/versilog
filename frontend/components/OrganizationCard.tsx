import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "./../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Colors from "../constants/Colors";

const OrganizationCard = ({
  name = "",
  role = "",
  memberCount = 0,
  href = "/",
}) => {
  return (
    <View
      style={{
        ...theme.card,
        ...theme.shadow,
        width: 300,
        height: 150,
        margin: 4,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          height: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Link href={href as any} asChild style={{ cursor: "pointer" }}>
          <TouchableOpacity>
            <Ionicons name="menu-sharp" size={20} />
          </TouchableOpacity>
        </Link>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, ...theme.centerView }}>
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: Colors.grey4,
              ...theme.centerView,
            }}
          >
            <Text>Logo</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "column", flex: 2, justifyContent: "center" }}
        >
          <Text style={theme.headerText}>{name}</Text>
          <Text style={theme.bodyText}>{"Role: " + role}</Text>
          <Text style={theme.bodyText}>{"Members: " + memberCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrganizationCard;

const styles = StyleSheet.create({});
