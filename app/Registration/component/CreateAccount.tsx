import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const registrationSchema = z.object({
  contact: z.string()
    .min(1, "Contact information is required")
    .refine((val) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{10}$/;
      return emailPattern.test(val) || phonePattern.test(val);
    }, "Invalid email or phone number format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationSchema = z.infer<typeof registrationSchema>;

interface Props {
  handleNext: () => void;
}

export default function CreateAccount({ handleNext }: Props) {
  const router = useRouter();
  const [isEmail, setIsEmail] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      contact: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    // Store the form data in a global state or context if needed
    handleNext(); // Move to next step
  });

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <View className="flex justify-center items-center">
            <Image
              source={require("@/assets/images/VastLogo.png")}
              resizeMode="contain"
              className="w-[300px] h-[60px]"
            />
          </View>

          <Text className="text-2xl text-center text-neutral-800 font-semibold mt-10">
            Create Account
          </Text>

          <Controller
            control={control}
            name="contact"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title={isEmail ? "Email" : "Phone Number"}
                handleChangeText={onChange}
                otherStyles="mt-7"
                keyboardType={isEmail ? "email-address" : "phone-pad"}
                placeholder={isEmail ? "Enter Email" : "Enter Phone Number"}
                error={errors.contact?.message}
            
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="Password"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter Password"
                error={errors.password?.message}
    
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="Confirm Password"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
              
                
              />
            )}
          />

          <CustomButton
            title="Continue"
            handlePress={onSubmit}
            containerStyles="mt-7"
            textStyles="text-white font-bold text-2xl"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-purple-700 underline font-pregular">
              Already have an account?
            </Text>
            <Text className="text-lg font-psemibold underline text-purple-700">
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}