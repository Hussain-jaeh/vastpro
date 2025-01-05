import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const ElectricityDetail = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800">Electricity</Text>
        <Text className="mt-2 text-gray-600">Pay your electricity bills</Text>
        
        <View className="mt-6">
          {/* Add your electricity payment functionality here */}
          <Text className="text-lg text-gray-700">Select Electricity Provider</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ElectricityDetail;