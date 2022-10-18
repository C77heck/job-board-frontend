import { useCallback, useEffect, useReducer, useState } from "react";

export interface Input {
    inputName: string;
    value: string | number | boolean;
    valid: boolean;
}

export interface SetAction {
    type: 'SET';
    inputs: Input;
}

export interface ChangeAction extends Input {
    type: 'CHANGE';
}

export type DispatchFunction = (input: Input) => void;

// the state will be the initial and current state object we pass over
// figure a generic insertion for the state as we dont know the type of it
// we can dispatch different actions based on presets below of the reducer
const formReducer = (state: any, action: SetAction | ChangeAction) => {
    switch (action.type) {
        case 'SET':
            return {
                inputs: action.inputs,
            };
        case 'CHANGE':
            const { value, valid, inputName } = action;

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [inputName]: { value, valid },
                }
            };
        default:
            return state;
    }
};

export const useFormReducer = (inputs: any) => {
    const [inputState, dispatch] = useReducer(formReducer, { inputs, isFormValid: false });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(validate(inputState));
    }, [inputState.inputs]);

    const validate = (inputState: any) => {
        for (const key of Object.keys(inputState.inputs)) {
            if (!inputState.inputs[key].valid) {
                return false;
            }
        }

        return true;
    };

    const inputHandler: DispatchFunction = useCallback(({ inputName, value, valid }: Input) => {
        dispatch({ inputName, value, valid, type: 'CHANGE' });
    }, []);

    const setFormData = useCallback((inputs) => {
        dispatch({ type: 'SET', inputs: inputs });
    }, []);

    return [inputState, inputHandler, isFormValid, setFormData];
};
