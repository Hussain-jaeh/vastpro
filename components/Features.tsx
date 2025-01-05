import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the types for your navigation
type RootStackParamList = {
  DataBundleDetail: undefined;
  Recharge2CashDetail: undefined;
  AirtimeDetail: undefined;
  ElectricityDetail: undefined;
  ReferEarnDetail: undefined;
  CableDetail: undefined;
  ExamDetail: undefined;
  DataCardDetail: undefined;
  RechargeCardDetail: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Features = () => {
  const navigation = useNavigation<NavigationProp>();

  const featuresData = [
    { name: "Data & Bundle", icon: <Ionicons name="cloud-download-outline" size={40} color="white" />, route: "features/DataBundleDetail" as keyof RootStackParamList },
    { name: "Recharge2Cash", icon: <Ionicons name="wallet-outline" size={40} color="white" />, route: "features/Recharge2CashDetail" as keyof RootStackParamList },
    { name: "Airtime", icon: <Ionicons name="phone-portrait-outline" size={40} color="white" />, route: "features/AirtimeDetail" as keyof RootStackParamList },
    { name: "Electricity", icon: <Ionicons name="flash-outline" size={40} color="white" />, route: "features/ElectricityDetail" as keyof RootStackParamList },
    { name: "Refer & Earn", icon: <Ionicons name="cash-outline" size={40} color="white" />, route: "ReferEarnDetail" as keyof RootStackParamList },
    { name: "Cable", icon: <Ionicons name="tv-outline" size={40} color="white" />, route: "features/CableDetail" as keyof RootStackParamList },
    { name: "Exam", icon: <Ionicons name="school-outline" size={40} color="white" />, route: "ExamDetail" as keyof RootStackParamList },
    { name: "Data Card", icon: <Ionicons name="id-card-outline" size={40} color="white" />, route: "DataCardDetail" as keyof RootStackParamList }, // Updated icon here
    { name: "Recharge Card", icon: <Ionicons name="card-outline" size={40} color="white" />, route: "RechargeCardDetail" as keyof RootStackParamList },
  ];

  const handleFeatureClick = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView className="bg-white mt-4 p-5 rounded-xl shadow-lg m-[-0.5rem]">
      <Text className="text-[1.5rem] font-semibold mb-6 text-gray-800">Features</Text>
      
      <View className="flex flex-wrap flex-row justify-between">
        {featuresData.map((feature, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFeatureClick(feature.route)}
            className="flex flex-col items-center w-[30%] mb-6"
          >
            <View className="bg-[#500073] w-[80px] h-[80px] rounded-full flex items-center justify-center border-4 border-white">
              {/* Display the icon inside the circle */}
              {feature.icon}
            </View>
            <Text className="mt-3 font-medium text-md text-gray-800 text-center">
              {feature.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Features;
