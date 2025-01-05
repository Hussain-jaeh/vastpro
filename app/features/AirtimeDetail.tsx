import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AirtimeTopUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedLine, setSelectedLine] = useState('');

  const handlePurchase = () => {
    if (!phoneNumber || !amount || !selectedLine) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    Alert.alert('Success', 'Airtime purchase successful!');
  };

  return (
    <ScrollView className=" flex-1 mt-20">

      <View className="flex flex-row justify-between items-center p-4 ">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-[1.5rem] text-black font-semibold">Airtime Top Up</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Line Selection */}
      <View className="mt-8 px-4">
      
        <View className="flex flex-row justify-between mb-6 mt-10">
          <TouchableOpacity
            onPress={() => setSelectedLine('MTN')}
            className={`w-1/4 items-center ${selectedLine === 'MTN' ? 'border-2 border-blue-600' : ''}`}
          >
            <Image
                source={require("@/assets/images/mtn.png")}
                resizeMode="cover"
               className="w-[5rem] h-[5rem]  mb-2"
            />
            <Text className="text-center text-gray-700">MTN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedLine('Airtel')}
            className={`w-1/4 items-center ${selectedLine === 'Airtel' ? 'border-2 border-blue-600' : ''}`}
          >
           <Image
                source={require("@/assets/images/airtel1.png")}
                resizeMode="cover"
               className="w-[5rem] h-[5rem] mb-2"
            />
            <Text className="text-center text-gray-700">Airtel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedLine('Glo')}
            className={`w-1/4 items-center ${selectedLine === 'Glo' ? 'border-2 border-blue-600' : ''}`}
          >
           <Image
                source={require("@/assets/images/glo.png")}
                resizeMode="cover"
               className="w-[5rem] h-[5rem] mb-2"
            />
            <Text className="text-center text-gray-700">Glo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedLine('9Mobile')}
            className={`w-1/4 items-center ${selectedLine === '9Mobile' ? 'border-2 border-blue-600' : ''}`}
          >
            <Image
                source={require("@/assets/images/9mobile1.png")}
                resizeMode="cover"
               className="w-[5rem] h-[5rem] mb-2"
            />
            <Text className="text-center text-gray-700">9Mobile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Fields Section */}
      <View className="px-4 mt-4">
        <Text className="text-sm text-gray-600 mb-2">Mobile Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Enter mobile number"
          className="border p-3 rounded-lg mb-4"
        />

        <Text className="text-sm text-gray-600 mb-2">Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          className="border p-3 rounded-lg mb-6"
        />
      </View>

      {/* Purchase Button */}
      <View className="px-4 mb-6">
        <TouchableOpacity
          onPress={handlePurchase}
          className="bg-blue-600 p-4 rounded-lg items-center"
        >
          <Text className="text-white text-lg font-semibold">Purchase</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AirtimeTopUpScreen;
