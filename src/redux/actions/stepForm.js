export const NEXT = 'NEXT';
export const SET_STEP = 'SET_STEP';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';
export const SET_ALL_STEPS = 'SET_ALL_STEPS';
export const RESET = 'RESET';

export const handleNext = () => ({
    type: NEXT
});

export const setStep = step => ({
    type: SET_STEP,
    step
});

export const nextStep = () => ({
    type: NEXT_STEP
});

export const previousStep = () => ({
    type: PREVIOUS_STEP
});

export const setAllSteps = allSteps => ({
    type: SET_ALL_STEPS,
    allSteps: allSteps
});

export const reset = () => ({
    type: RESET
});