import React, { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { CONSTANTS } from '../constants';
import { FormContext } from '../contexts/form.context';
import { Checkbox } from './checkbox';
import { Datepicker } from './datepicker';
import { RangeInput } from './range-input';
import { SearchableDropdown } from './searchable-dropdown';
import { TextInput } from './text-input';
import { Textarea } from './textarea';
import { ValidatorInterface } from './validators/validator-interface';

export interface FieldProps {
    type: string;
    name: string;
    id: string | undefined;
    readOnly: boolean;
    required: boolean;
    placeholder: string;
    autoComplete: string | undefined;
    disabled: boolean | undefined;
    className: string | undefined;
    inputClasses: string;
    validators: any[]; // TODO -> we will need a validator interface here.
    getData: (value: any, hasError: boolean) => void;
    errorMessage: string;
    label: string;
    options: string[];
    element: 'text' | 'dropdown' | 'searchable' | 'searchable_dropdown' | 'textarea' | 'checkbox' | 'datepicker' | string;
    isNumberOnly: boolean;
    value: string | string[] | null;
    onChange: (prop: string, value: string) => void;
    namespace: string;
    labelClass: string;
    wrapperClasses: string;
    rows: number;
    cols: number;
}

interface NormalWrapperProps extends FieldProps {
    prodRef: RefObject<any>;
    hasError: boolean;
    errorMessage: string;
    children: any;
    isInFocus: boolean;
}

const NormalWrapper = (props: NormalWrapperProps) => {
    return <div
        className={`display-flex flex-column ${props.className}`}
        ref={props.prodRef}
    >
        {props.label && <label
            className={`input-label error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--label ${props.labelClass}`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}
        <div
            className={`position-center input-wrapper overflow-hidden ${props.wrapperClasses} error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--div`}
        >
            {props.children}
        </div>
        {!!props.hasError && !props.isInFocus && <small className={'error-show'}>{props.errorMessage || props.errorMessage}</small>}
    </div>;
};

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState('');
    const [isInFocus, setIsInFocus] = useState(true);
    // TODO -> probably will need to move over the error from props to state...
    const [errorMessage, setErrorMessage] = useState('');
    const prodRef: RefObject<HTMLDivElement> = React.createRef();
    const { setData } = useContext(FormContext);
    const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN, RANGE, CHECKBOX, DATEPICKER } } = CONSTANTS;

    useEffect(() => {
        setValue(props.value as string);
    }, [props.value]);

    useEffect(() => {
        const { hasError, errorMessage } = validate(value);
        setHasError(hasError);
        setErrorMessage(errorMessage);
        setData(props.name, { value, isValid: !hasError }, props.namespace);
    }, [value]);

    const removeNonNumericValues = useCallback((value: string) => {
        const isNumeric = /^-?\d*\.?\d*$/;
        return value.split('').filter(v => isNumeric.test(v)).join('');
    }, []);

    const validate = (value: string): ValidatorInterface => {
        const hasErrors = !!props.validators && !!props.validators.length
            ? props.validators.map((validator: any) => validator(value)).filter((res: ValidatorInterface) => res.hasError)
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    };

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const val = props.isNumberOnly ? removeNonNumericValues(value) : value;
        setValue(val);
    };

    const onClickHandler = (isChosen: boolean, option: string) => {
        setValue(isChosen ? '' : option);
    };

    const manageInputType = (element: string) => {
        switch (element) {
            case DROPDOWN:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />; // will need the dropdown
            case SEARCHABLE:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />; // will need the dropdown
            case SEARCHABLE_DROPDOWN:
                return <SearchableDropdown
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    divRef={prodRef}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                    onClickHandler={(isChosen: boolean, value: string) => onClickHandler(isChosen, value)}
                />;
            case TEXTAREA:
                return <Textarea
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
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
            case DATEPICKER:
                return <Datepicker
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />;
            default:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                />;
        }
    };

    const element = props?.element || '';

    return element === CHECKBOX || element === TEXTAREA
        ? manageInputType(element)
        : <NormalWrapper {...props} {...{ prodRef, hasError, errorMessage, isInFocus }}>{manageInputType(element)}</NormalWrapper>;
};
