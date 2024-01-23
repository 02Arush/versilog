import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/FloatingButton";
import theme from "./../../constants/theme";
import OrganizationCard from "../../components/OrganizationCard";

const organizations = [
  {
    name: "AlphaOrg",
    role: "Owner",
    memberCount: 5,
    href: "/alpha",
  },
  {
    name: "BetaGroup",
    role: "Admin",
    memberCount: 8,
    href: "/beta",
  },
  {
    name: "GammaAssociation",
    role: "Member",
    memberCount: 10,
    href: "/gamma",
  },
  {
    name: "DeltaCorp",
    role: "Owner",
    memberCount: 6,
    href: "/",
  },
  {
    name: "EpsilonEnterprise",
    role: "Admin",
    memberCount: 9,
    href: "/",
  },
  {
    name: "ZetaInc",
    role: "Member",
    memberCount: 7,
    href: "/",
  },
  {
    name: "EtaFirm",
    role: "Owner",
    memberCount: 4,
    href: "/",
  },
  {
    name: "ThetaLLC",
    role: "Admin",
    memberCount: 11,
    href: "/",
  },
  {
    name: "IotaSolutions",
    role: "Member",
    memberCount: 12,
    href: "/",
  },
  {
    name: "KappaServices",
    role: "Owner",
    memberCount: 8,
    href: "/",
  },
];

const my_orgs = () => {
  return (
    <SafeAreaView style={theme.pageContainer}>
      <View style={{ ...theme.centerView, flex: 1 }}>
        <Text style={theme.headerText}>Manage Organizations</Text>
      </View>
      <View style={{ flex: 4 }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {organizations.map(({ name, role, memberCount, href }, index) => (
            <OrganizationCard
              name={name}
              role={role}
              memberCount={memberCount}
              href={href}
              key={index}
            />
          ))}
        </ScrollView>
      </View>

      <FloatingButton
        iconName="ios-people-sharp"
        href="/create_or_join/create_org"
      />
    </SafeAreaView>
  );
};

export default my_orgs;

const styles = StyleSheet.create({});
