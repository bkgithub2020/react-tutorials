import React, { useState } from 'react';
import StepSection from './steps/StepSection';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import ParentDetails from './ParentDetails';

function StudentStepForm({ setStudentsFunc, studentData }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [stepValidation, setStepValidation] = useState(true);
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);

    const nextStepValidation = () => {
        const { firstName, lastName, gender, address1, city, state, zip, country } = formState.values;

        switch (currentStep) {
            case 1:
                if ((!firstName || firstName === "")
                    || (!lastName || lastName === "")
                    || (!gender || gender === "")
                ) {
                    setStepValidation(false);
                } else {
                    setStepValidation(true);
                    nextStep();
                }
                break;

            case 2:
                if ((!address1 || address1 === "")
                    || (!city || city === "")
                    || (!state || state === "")
                    || (!zip || zip === "")
                    || (!country || country === "")
                ) {
                    setStepValidation(false);
                } else {
                    setStepValidation(true);
                    nextStep();
                }
                break;

            case 3:
                if ((!firstName || firstName === "")
                    || (!lastName || lastName === "")
                    || (!gender || gender === "")
                ) {
                    setStepValidation(false);
                } else {
                    setStepValidation(true);
                    nextStep();
                }
                break;

            default:
                break;
        }

    }

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

        const { firstName, lastName, gender, address1, city, state, zip, country } = formState.values;

        if (firstName && lastName && gender && address1 && city && state && zip && country) {
            setStudentsFunc([...studentData, formState.values]);
            setFormState({ values: {} });
            setSubmitted(false);
            setOpenState(true);
            setMessage("Student Added Successfully!")
        }
    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };


    switch (currentStep) {
        case 1:
            return (
                <>
                    <StepSection
                        nextFunc={nextStepValidation}
                        nextStep={true}
                        previousStep={false}
                        finalStep={false}
                        openState={openState}
                        message={message}
                        handleClose={handleClose}
                        formComponent={
                            <PersonalDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                                stepValidation={stepValidation}
                            />
                        }
                    />
                </>
            );
        case 2:
            return (
                <>
                    <StepSection
                        nextFunc={nextStepValidation}
                        previousFunc={previousStep}
                        nextStep={true}
                        previousStep={true}
                        finalStep={false}
                        openState={openState}
                        message={message}
                        handleClose={handleClose}
                        formComponent={
                            <AddressDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                                stepValidation={stepValidation}
                            />
                        }
                    />
                </>
            );
        case 3:
            return (
                <>
                    <StepSection
                        nextFunc={nextStepValidation}
                        previousFunc={previousStep}
                        nextStep={false}
                        previousStep={true}
                        finalStep={true}
                        submitFunc={handleSubmit}
                        openState={openState}
                        message={message}
                        handleClose={handleClose}
                        formComponent={
                            <ParentDetails
                                handleChangeCall={handleChange}
                                currentFormState={formState}
                                submittedStatus={submitted}
                                stepValidation={stepValidation}
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