import React, { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { FormContext } from '../contexts/form.context';
import { Checkbox } from './checkbox';
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
    inputClasses?: string;
    wrapperClasses?: string;
    labelClass?: string;
    validators?: any[]; // TODO -> we will need a validator interface here.
    getData: (value: any, hasError: boolean) => void;
    errorMessage?: string;
    label?: string;
    options?: string[];
    element?: 'text' | 'dropdown' | 'searchable' | 'searchable_dropdown' | 'textarea' | 'checkbox' | string;
    isNumberOnly?: boolean;
    value: string | null;
    onChange?: (value: string) => void;
    namespace: string;
}

interface NormalWrapperProps extends FieldProps {
    prodRef: RefObject<any>;
    hasError: boolean;
    errorMessage: string;
    children: any;
}

const NormalWrapper = (props: NormalWrapperProps) => {
    return <div
        className={`display-flex flex-column ${props.className}`}
        ref={props.prodRef}
    >
        {props.label && <label
            className={`input-label error-${props.hasError ? 'show' : 'hide'}--label ${props.labelClass}`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}
        <div
            className={`input-wrapper overflow-hidden ${props.wrapperClasses} error-${props.hasError ? 'show' : 'hide'}--div`}
        >
            {props.children}
        </div>
        {!!props.hasError && <small className={'error-show'}>{props.errorMessage || props.errorMessage}</small>}
    </div>;
};

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState('');
    // TODO -> probably will need to move over the error from props to state...
    const [errorMessage, setErrorMessage] = useState('');
    const prodRef: RefObject<HTMLDivElement> = React.createRef();
    const { setData } = useContext(FormContext);
    const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN, RANGE, CHECKBOX } } = CONSTANTS;

    useEffect(() => {
        setData(props.name, { value: props?.value || '', isValid: false }, props.namespace);
    }, []);

    useEffect(() => {
        if (!!props.value) {
            setValue(props.value);
        }
    }, [props.value]);

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
        setData(props.name, { value, isValid: !hasError }, props.namespace);
    };

    const onClickHandler = (isChosen: boolean, option: string) => {
        setValue(isChosen ? '' : option);
    };

    const manageInputType = (element: string) => {
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
            case CHECKBOX:
                return <Checkbox
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

    const element = props?.element || '';

    return element === CHECKBOX ? manageInputType(element) : <NormalWrapper {...props} {...{ prodRef, hasError, errorMessage }}>
        {manageInputType(element)}
    </NormalWrapper>;
};
