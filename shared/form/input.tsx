import React, { RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { Eyeicon } from '../components/icons/icons';
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
            className={`position-center input-wrapper overflow-hidden ${props.wrapperClasses} error-${props.hasError ? 'show' : 'hide'}--div`}
        >
            {props.children}
        </div>
        {!!props.hasError && <small className={'error-show'}>{props.errorMessage || props.errorMessage}</small>}
    </div>;
};

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState(props.value);
    // TODO -> probably will need to move over the error from props to state...
    const [errorMessage, setErrorMessage] = useState('');
    const prodRef: RefObject<HTMLDivElement> = React.createRef();
    const { setData } = useContext(FormContext);
    const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN, RANGE, CHECKBOX } } = CONSTANTS;
    const [onValueChange$] = useState(() => new Subject());

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

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

    const manageValidation = (val: any) => {
        const { hasError, errorMessage } = validate(val);
        setHasError(hasError);
        setErrorMessage(errorMessage);
    };

    useEffect(() => {
        const subscription = onValueChange$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            tap(a => console.log(a))
        ).subscribe((v) => manageValidation(v) as any);

        return () => subscription.unsubscribe();
    }, []);

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const val = props.isNumberOnly ? removeNonNumericValues(value) : value;
        setValue(val);
        onValueChange$.next(val);
        setData(props.name, { value: val, isValid: !hasError }, props.namespace);
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

    return element === CHECKBOX
        ? manageInputType(element)
        : <NormalWrapper {...props} {...{ prodRef, hasError, errorMessage }}>{manageInputType(element)}</NormalWrapper>;
};
