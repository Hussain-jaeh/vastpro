import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { CustomDropdown } from "@/components/CustomDropdown";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
});

type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

interface Props {
  handleNext: () => void;
  handlePrevious: () => void;
}

export default function PersonalInfo({ handleNext, handlePrevious }: Props) {
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchLGAs(selectedState);
    }
  }, [selectedState]);

  const fetchStates = async () => {
    try {
      const response = await fetch('https://nga-states-lga.onrender.com/fetch');
      const data = await response.json();
      setStates(data.map((state: any) => state.state));
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchLGAs = async (state: string) => {
    try {
      const response = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`);
      const data = await response.json();
      setLgas(data.lgas);
    } catch (error) {
      console.error('Error fetching LGAs:', error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      lga: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    handleNext();
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
            Personal Information
          </Text>

          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="First Name"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter First Name"
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="Last Name"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter Last Name"
                error={errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <FormField
                value={value}
                title="Address"
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter Address"
                error={errors.address?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value } }) => (
              <CustomDropdown
                title="State"
                value={value}
                items={states}
                onSelect={(item) => {
                  onChange(item);
                  setSelectedState(item);
                }}
                otherStyles="mt-7"
                placeholder="Select State"
                error={errors.state?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lga"
            render={({ field: { onChange, value } }) => (
              <CustomDropdown
                title="LGA"
                value={value}
                items={lgas}
                onSelect={onChange}
                otherStyles="mt-7"
                placeholder="Select LGA"
                error={errors.lga?.message}
              />
            )}
          />

          <CustomButton
            title="Continue"
            handlePress={onSubmit}
            containerStyles="mt-7"
            textStyles="text-white font-bold text-2xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
