import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import CustomButton from "@/components/CustomButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";

const otpSchema = z.object({
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers")
});

type OtpSchema = z.infer<typeof otpSchema>;

interface Props {
  handleComplete: () => void;
}

export default function OTPVerification({ handleComplete }: Props) {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerify = handleSubmit(async (data) => {
    try {
      Toast.show({
        type: "success",
        text1: "Registration successful!",
        text2: "Please login to continue",
      });

      
      setTimeout(() => {
        router.replace("/"); 
      }, 1500);
      
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2: "Please try again",
      });
    }
  });

  const handleResendOTP = () => {
    if (!canResend) return;

    setTimeLeft(60);
    setCanResend(false);
    Toast.show({
      type: "success",
      text1: "OTP resent successfully",
    });
  };

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
            Verify Your Email
          </Text>

          <Text className="text-center text-gray-600 mt-4">
            We've sent a verification code to{"\n"}
            {params.contact}
          </Text>

          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="Enter OTP"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter 6-digit OTP"
                keyboardType="number-pad"
                maxLength={6}
                error={errors.otp?.message}
              />
            )}
          />

          <CustomButton
            title="Verify"
            handlePress={handleVerify}
            containerStyles="mt-7"
            textStyles="text-white font-bold text-2xl"
          />

          <View className="justify-center pt-5 items-center">
            <Text className="text-gray-600">
              Didn't receive the code?{" "}
              {timeLeft > 0 ? (
                <Text className="text-purple-700">
                  Resend in {timeLeft}s
                </Text>
              ) : (
                <Text
                  className="text-purple-700 underline"
                  onPress={handleResendOTP}
                >
                  Resend OTP
                </Text>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}