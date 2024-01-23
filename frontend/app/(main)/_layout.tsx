import { Tabs } from "expo-router/tabs";
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="my_orgs"
        options={{ title: "My Organizations", headerShown: false }}
      />
      <Tabs.Screen
        name="[orgName]"
        options={{ href: null, title: "View Organization" }}
      />
    </Tabs>
  );
}
