import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; // Importing MaterialIcons from Expo Vector Icons
import Features from "../../components/Features";  // Assuming your Features component is correctly set up

const Home = () => {

  return (
    <SafeAreaView className="flex-1 bg-[#2A004E]">
      {/* Profile Section */}
      <View className="flex-row items-center px-5 pt-10 mb-5">
        {/* Profile Image */}
        <Image
          source={require("@/assets/images/imageicon.jpg")}
          resizeMode="cover" 
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        {/* Text Section */}
        <View className="ml-4">
          <Text className="text-xl font-bold text-white">Hello Admin</Text>
          <Text className="text-sm text-gray-200">Experience Swift Bill Payment</Text>
        </View>
      </View>

      {/* Notification Bell */}
      <View className="absolute top-[7rem] right-6">
        <MaterialIcons name="visibility" size={25} color="white" />
      </View>

      {/* Wallet Section */}
      <View className="mt-10 px-5 items-center">
        <Text className="text-[2rem] font-semibold text-red-500">Wallet</Text>
        <View className="flex-row items-center mt-2 gap-5">
          <Text className="text-lg font-bold text-gray-100">₦ 214.50</Text>
          <MaterialIcons name="visibility" size={25} color="white" />
          <MaterialIcons name="rotate-right" size={25} color="white" />
        </View>
      </View>

      {/* Account Information Section */}
      <View className="bg-white rounded-xl mx-12 p-4 mt-5 shadow-lg">

        <View className="flex flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-400">Account Number</Text>
          <MaterialIcons name="more-horiz" size={25} color="black" />
        </View>

        {/* Account Number Display */}
        <View className="mt-4 items-center">
          {/* Account Number */}
          <View className="flex flex-row justify-between items-center gap-[1rem]">
            <Text className="text-lg font-bold text-gray-800">23482834654</Text>

            {/* Copy Icon */}
            <TouchableOpacity className="mt-2">
              <MaterialIcons name="content-copy" size={25} color="black" />
            </TouchableOpacity>
          </View>

          {/* Bank Name */}
          <View className="flex flex-row justify-between items-center gap-[1rem]"> 
            <Text className="mt-4 text-md text-gray-400">9spb</Text>
            <Text className="mt-4 text-md text-gray-900">Emmanual hussain</Text>
          </View>

          {/* Charges */}
          <View className="flex flex-row justify-between items-center gap-[1rem]"> 
            <Text className="mt-4 text-md text-gray-400">Charges</Text>
            <Text className="mt-4 text-md text-gray-900">1% capped at 50</Text>
          </View>  
        </View>
      </View>

      {/* Fund wallet and History section */}
      <View className="p-4 m-5 border rounded-lg flex-row items-center justify-between bg-[#3d0270]">
        <View className="flex-row items-center">
          <MaterialIcons name="wallet" size={24} color="#fff" />
          <Text className="ml-2 text-[#ffd]">Fund wallet</Text>
        </View>

        <View className="flex-row items-center">
          <MaterialIcons name="history" size={24} color="#fff" />
          <Text className="ml-2 text-white">History</Text>
        </View>
      </View>

      {/* Features Section */}
      <View className="h-[20rem]">
        <Features/>
      </View>

    </SafeAreaView>
  );
};

export default Home;
