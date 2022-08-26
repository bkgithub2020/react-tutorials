import React, { useState } from 'react';
import Button from '@mui/material/Button';
import NextStep from './steps/NextStep';
import PreviousStep from './steps/PreviousStep';
import StepSection from './steps/StepSection';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import ParentDetails from './ParentDetails';

function StudentStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        values: {}
    });

    const nextStep = () => {
        setCurrentStep((step) => {
            return step + 1;
        })
    }

    const previousStep = () => {

        setCurrentStep((step) => {
            return step - 1;
        })
    }

    const handleChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            }

        }));
    }

    const handleSubmit = (e) => {
        setSubmitted(true);
        e.preventDefault();
        console.log(formState.values);
    }


    switch (currentStep) {
        case 1:
            return (
                <>
                    <StepSection
                        nextFunc={nextStep}
                        nextStep={true}
                        previousStep={false}
                        finalStep={false}
                        formComponent={
                            <PersonalDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
                        }
                    />
                </>
            );
        case 2:
            return (
                <>
                    <StepSection
                        nextFunc={nextStep}
                        previousFunc={previousStep}
                        nextStep={true}
                        previousStep={true}
                        finalStep={false}
                        formComponent={
                            <AddressDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
                        }
                    />
                </>
            );
        case 3:
            return (
                <>
                    <StepSection
                        nextFunc={nextStep}
                        previousFunc={previousStep}
                        nextStep={false}
                        previousStep={true}
                        finalStep={true}
                        submitFunc={handleSubmit}
                        formComponent={
                            <ParentDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                            />
                        }
                    />
                </>
            );
        default:
            break;
    }
}

export default StudentStepForm;