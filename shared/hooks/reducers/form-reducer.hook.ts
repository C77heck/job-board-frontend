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

export interface DestroyAction {
    type: 'DESTROY';
}

export type ActionType = SetAction | ChangeAction | DestroyAction;

export interface DispatchInputOptions extends Input {
    inputName: string;
}

export type DispatchFunction<TOptions> = (options: TOptions) => void;

const formReducer = (state: InputState, action: ActionType): InputState => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                inputs: { ...state.inputs, ...action.inputs },
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
        case 'DESTROY':
            const newState: any = {};
            Object.keys(state).forEach(key => newState[key] = { value: '', valid: false });

            return newState;
        default:
            return state;
    }
};

export interface ReducerResponse {
    inputState: InputState;
    inputHandler: DispatchFunction<DispatchInputOptions>;
    isFormValid: boolean;
    setFormData: DispatchFunction<InputState['inputs']>;
    destroy: DispatchFunction<void>;
    getPayload: (state: any) => any;
}

export const useForm = (inputs: any): ReducerResponse => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputState, dispatch] = useReducer(formReducer, inputs);

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

    const destroy: DispatchFunction<void> = useCallback(() => {
        dispatch({ type: 'DESTROY' });
    }, []);

    const getPayload = useCallback((inputs: any) => {
        const payload: any = {};

        Object.keys(inputs).forEach(key => payload[key] = inputs?.[key]?.value);

        return payload;
    }, []);

    return { inputState, inputHandler, isFormValid, setFormData, getPayload, destroy };
};
