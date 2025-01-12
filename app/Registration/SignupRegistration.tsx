
import { View } from "react-native";
import { useState } from "react";
import CreateAccount from "./component/CreateAccount";
import PersonalInfo from "./component/PersonalInformation";
import OTPVerification from "./component/OTPVerification"

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    
    const handleNext = () => {
      setStep(step + 1);
    };
    
    const handlePrevious = () => {
      setStep(step - 1);
    };
  
    return (
      <View>
        {step === 1 && (
          <CreateAccount handleNext={handleNext} />
        )}
        {step === 2 && (
          <PersonalInfo
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        )}
        {step === 3 && (
          <OTPVerification
            handleComplete={() => {
              // Any final cleanup or state reset if needed
            }}
          />
        )}
      </View>
    );
  }