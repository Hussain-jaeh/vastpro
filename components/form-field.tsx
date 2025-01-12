// components/form-field.tsx
import { View, Text, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  error?: string;
  placeholder?: string;
}

export default function FormField({
  title,
  value,
  handleChangeText,
  otherStyles = "",
  error,
  placeholder,  // Receive placeholder prop
  ...props
}: Props) {
  return (
    <View className={`w-full ${otherStyles}`}>
      <Text className="text-base font-medium text-neutral-700 mb-2">{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}  // Pass placeholder to TextInput
        placeholderTextColor="#A3A3A3"  // Set the placeholder color to ensure visibility
        className={`w-full border rounded-lg p-4 text-base ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
