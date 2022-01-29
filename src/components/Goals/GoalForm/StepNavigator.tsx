import { FlexContainer, Button } from '@components/UI';
import { useFormContext } from '@lib/context/form';

interface StepNavigatorProps {
  stepAmount: number;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  disabled?: boolean;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({
  stepAmount,
  onNextStep,
  onPreviousStep,
  disabled,
}) => {
  const { currentStep } = useFormContext();
  return (
    <div>
      <FlexContainer>
        {currentStep + 1 < stepAmount && (
          <Button
            disabled={disabled}
            handleOnClick={() => {
              onNextStep();
            }}
          >
            Next Step
          </Button>
        )}
        {currentStep === stepAmount && (
          <Button
            disabled={disabled}
            handleOnClick={() => {
              onNextStep();
            }}
          >
            Submit
          </Button>
        )}
        {currentStep > 0 && (
          <Button variant="styleless" handleOnClick={onPreviousStep}>
            Previous Step
          </Button>
        )}
      </FlexContainer>
    </div>
  );
};

export default StepNavigator;
