import React, { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { FormContext } from '../contexts/form.context';
import { RangeInput } from './range-input';
import { SearchableDropdown } from './searchable-dropdown';
import { TextInput } from './text-input';
import { ValidatorInterface } from './validators/validator-interface';

export interface FieldProps {
    type?: string;
    name: string;
    id?: string | undefined;
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    className?: string | undefined;
    validators?: any[]; // TODO -> we will need a validator interface here.
    getData: (value: any, hasError: boolean) => void;
    errorMessage?: string;
    label?: string;
    options?: string[];
    element?: 'text' | 'dropdown' | 'searchable' | 'searchable_dropdown' | 'textarea';
    isNumberOnly?: boolean;
    value: string | null;
    onChange?: (value: string) => void;
    inputClasses?: string;
    namespace: string;
}

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const prodRef: RefObject<HTMLDivElement> = React.createRef();
    const { getData, getForm, isFormValid, formData } = useContext(FormContext);

    useEffect(() => {
        if (!!props.value) {
            setValue(props.value);
        }
        console.log(formData);
    }, [props.value, formData]);

    const validate = (value: string): ValidatorInterface => {
        const hasErrors = !!props.validators && !!props.validators.length
            ? props.validators.map((validator: any) => validator(value))
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    };

    const removeNonNumericValues = useCallback((value: string) => {
        const isNumeric = /^-?\d*\.?\d*$/;
        return value.split('').filter(v => isNumeric.test(v)).join('');
    }, []);

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const { hasError, errorMessage } = validate(value);
        const val = props.isNumberOnly ? removeNonNumericValues(value) : value;
        setValue(val);
        setHasError(hasError);
        setErrorMessage(errorMessage);
        getData(props.name, { value, isValid: !hasError }, props.namespace);
    };

    const onClickHandler = (isChosen: boolean, option: string) => {
        setValue(isChosen ? '' : option);
    };

    const manageInputType = (element: string) => {
        const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN, RANGE } } = CONSTANTS;
        switch (element) {
            case DROPDOWN:
                return <TextInput
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />; // will need the dropdown
            case SEARCHABLE:
                return <TextInput
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />; // will need the dropdown
            case SEARCHABLE_DROPDOWN:
                return <SearchableDropdown
                    {...props}
                    divRef={prodRef}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                    onClickHandler={(isChosen: boolean, value: string) => onClickHandler(isChosen, value)}
                />;
            case TEXTAREA:
                return <TextInput
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />;  // will need the textarea
            case RANGE:
                return <RangeInput
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />;
            default:
                return <TextInput
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />;
        }
    };

    return <div
        className={`display-flex flex-column ${props.className}`}
        ref={prodRef}
    >
        {props.label && <label
            className={`input-label error-${hasError ? 'show' : 'hide'}--label`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}
        <div
            className={`input-wrapper ${props.inputClasses} error-${hasError ? 'show' : 'hide'}--div`}
        >
            {manageInputType(props.element || 'text')}
        </div>
        {!!hasError && <small className={'error-show'}>{props.errorMessage}</small>}
    </div>;
};
