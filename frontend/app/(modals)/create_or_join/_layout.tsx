import { Tabs } from "expo-router/tabs";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="create_org"
        options={{ title: "Create Organization", headerShown: false }}
      />
      <Tabs.Screen
        name="join_org"
        options={{ title: "Join Organization", headerShown: false }}
      />
    </Tabs>
  );
}
