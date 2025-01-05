import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";  // Import Expo Icons
import { useAuth } from "@/context/AuthContext";

type TabIconProps = {
  iconName: string;
  color: string;
  name: string;
  focused: boolean;
  Icon: any;
};

const TabIcon = ({ iconName, color, name, focused, Icon }: TabIconProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Icon name={iconName} color={color} size={24} />
      <Text style={{ color, fontSize: 9, fontWeight: "bold", marginTop: 4 }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#69247C", 
        tabBarInactiveTintColor: "#6A669D", 
        tabBarStyle: {
          backgroundColor: '#fff', 
          borderTopWidth: 1,
          borderTopColor: '#fff',
          height: 84,
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 4 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 6, 
          elevation: 5, 
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName="home" color={color} name="Home" focused={focused} Icon={Ionicons} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName="wallet" color={color} name="Wallet" focused={focused} Icon={MaterialCommunityIcons} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon iconName="person" color={color} name="Profile" focused={focused} Icon={Ionicons} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;