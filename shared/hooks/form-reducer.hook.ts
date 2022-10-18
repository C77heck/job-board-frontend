import { useCallback, useEffect, useReducer, useState } from "react";

export interface Input {
    value: any;
    valid: boolean;
}

export interface InputState {
    inputs: { [key: string]: Input };
    isFormValid: boolean;
}

export interface SetAction {
    type: 'SET';
    inputs: InputState['inputs'];
    inputName?: string;
}

export interface ChangeAction extends Input {
    type: 'CHANGE';
    inputName: string;
}

export interface DispatchInputOptions extends Input {
    inputName: string;
}

export type DispatchFunction<TOptions> = (options: TOptions) => void;

// the state will be the initial and current state object we pass over
// figure a generic insertion for the state as we dont know the type of it
// we can dispatch different actions based on presets below of the reducer
const formReducer = (state: InputState, action: SetAction | ChangeAction): InputState => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
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

export interface ReducerResponse {
    inputState: InputState;
    inputHandler: DispatchFunction<DispatchInputOptions>;
    isFormValid: boolean;
    setFormData: DispatchFunction<InputState['inputs']>;
}

export const useFormReducer = (inputs: any): ReducerResponse => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputState, dispatch] = useReducer(formReducer, { inputs, isFormValid });

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

    const inputHandler: DispatchFunction<DispatchInputOptions> = useCallback(({ inputName, value, valid }) => {
        dispatch({ inputName, value, valid, type: 'CHANGE' });
    }, []);

    const setFormData: DispatchFunction<InputState['inputs']> = useCallback((inputs) => {
        dispatch({ type: 'SET', inputs: inputs });
    }, []);

    return { inputState, inputHandler, isFormValid, setFormData };
};
