import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const DataBundleDetail = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800">Data & Bundle</Text>
        <Text className="mt-2 text-gray-600">Purchase data bundles for all networks</Text>
        
        <View className="mt-6">
          {/* Add your data bundle options and functionality here */}
          <Text className="text-lg text-gray-700">Select Network Provider</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DataBundleDetail;