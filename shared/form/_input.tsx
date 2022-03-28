import React, { useState } from 'react';
import { FieldProps } from './input';

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const profRef = React.createRef();


};
