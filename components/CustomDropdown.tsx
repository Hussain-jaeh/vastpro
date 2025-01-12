import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown } from "lucide-react-native";

interface DropdownProps {
  title: string;
  value: string;
  items: string[];
  onSelect: (item: string) => void;
  placeholder?: string;
  error?: string;
  otherStyles?: string;
}

export function CustomDropdown({
  title,
  value,
  items,
  onSelect,
  placeholder = "Select an option",
  error,
  otherStyles = "",
}: DropdownProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-gray-600 font-semibold">{title}</Text>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`w-full border rounded-lg p-3 flex-row justify-between items-center ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <Text>{value || placeholder}</Text>
        <ChevronDown size={20} />
      </TouchableOpacity>

      {error && <Text className="text-red-500 mt-1">{error}</Text>}

      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setVisible(false)}
        >
          <View className="bg-white p-4 rounded-t-lg">
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  className={`p-4 border-b border-gray-100 ${item === value ? "bg-purple-50" : ""}`}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              className="max-h-96"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
