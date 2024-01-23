import { StyleSheet, Text, View, TextInput } from "react-native";
import theme from "./../../../constants/theme";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import ImagePickerBtn from "../../../components/ImagePickerBtn";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import { create_org as create_org_api } from "../../../api/api";
import { loadData } from "../../../api/storage";

const create_org = () => {
  const [orgName, setOrgName] = useState("");
  const [uniqueOrgName, setUniqueOrgName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [desc, setDesc] = useState("");

  const validOrganizationForm = () => {
    return (
      orgName.length > 0 &&
      uniqueOrgName.length > 0 &&
      organizationType.length > 0
    );
  };

  const handleCreateOrganization = async () => {
    try {
      const tok = await loadData("authToken");
      const user_id = tok.id;
      const response = await create_org_api(
        user_id,
        uniqueOrgName,
        orgName,
        desc
      );

      alert(response);
    } catch (err) {}
  };

  return (
    <View style={{ ...theme.pageContainer, ...theme.centerView }}>
      <View style={styles.outerCard}>
        <View style={styles.formItem}>
          <Text style={{ ...theme.bodyText, marginBottom: 4 }}>
            Organization Name
          </Text>
          <TextInput
            style={{ ...theme.textInput }}
            value={orgName}
            onChangeText={setOrgName}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={{ ...theme.bodyText }}>Unique Organization ID</Text>
          <TextInput
            style={{ ...theme.textInput }}
            value={uniqueOrgName}
            onChangeText={setUniqueOrgName}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={{ ...theme.bodyText, marginBottom: 4 }}>
            Organization Type
          </Text>
          <Picker
            style={{
              padding: 5,
              borderWidth: 0,
              borderRadius: 8,
              backgroundColor: Colors.grey4,
            }}
            selectedValue={organizationType}
            onValueChange={(itemValue, itemIndex) =>
              setOrganizationType(itemValue)
            }
          >
            <Picker.Item label="Group Project" value="group_project" />
            <Picker.Item label="Club/Volunteer" value="club_or_volunteer" />
            <Picker.Item label="Corporation" value="corporation" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <View style={styles.formItem}>
          <Text style={{ ...theme.bodyText, marginBottom: 4 }}>
            Logo Upload (optional)
          </Text>
          <ImagePickerBtn />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            text="Create New Organization"
            sx={{ marginVertical: 2, width: "100%" }}
            href="/my_orgs"
            onPress={() => {
              handleCreateOrganization();
            }}
          />
          <Button
            text="Cancel"
            sx={{ marginVertical: 2, width: "100%" }}
            href="/my_orgs"
          />
        </View>
      </View>
    </View>
  );
};

export default create_org;

const styles = StyleSheet.create({
  outerCard: {
    ...theme.card,
    ...theme.shadow,
    flexDirection: "column",
    backgroundColor: Colors.grey3,
    width: 300,
    alignItems: "center",
    minHeight: "90%",
    justifyContent: "center",
  },

  formItem: {
    marginVertical: 8,
    width: 200,
  },
});
