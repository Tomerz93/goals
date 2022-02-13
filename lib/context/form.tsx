import { FC, createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext<{
  formData: any;
  stepAmount: number;
  currentStep: number;
  onPreviousStep: (currentStep: number) => void;
  onNextStep: (data: any) => void;
  updateFormData: (data: any) => void;
  setFormData: (data: any) => void;
  currentStepData: any;
}>({
  formData: {},
  stepAmount: 0,
  currentStep: 0,
  onPreviousStep: () => {},
  onNextStep: () => {},
  updateFormData: () => {},
  currentStepData: {},
  setFormData: () => {},
});

const useFormContext = () => {
  return { ...useContext(FormContext) };
};

const FormProvider: FC<{ stepAmount: number }> = ({ children, stepAmount }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const onNextStep = (data) => {
    setFormData((prev) => ({ ...prev, [currentStep]: data }));
    setCurrentStep((prev) => prev + 1);
  };
  const onPreviousStep = () => setCurrentStep((prev) => prev - 1);
  const updateFormData = (data, stepIndex) => {
    setFormData((prevData) => ({ ...prevData, [stepIndex]: data }));
  };

  const currentStepData = formData[currentStep];
  return (
    <FormContext.Provider
      value={{
        formData,
        stepAmount,
        currentStep,
        onNextStep,
        setFormData,
        updateFormData,
        onPreviousStep,
        currentStepData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, useFormContext };
