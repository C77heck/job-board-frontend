import React, { useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import {
    VALIDATOR_REQUIRE
} from '../../shared/utility/validators';

import './user.scss'

const Signin = props => {

    const [disabled, setDisabled] = useState(true);
    const { username, password } = props.value;
    useEffect(() => {
        if (username.valid && password.valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [username, password])

    return (
        <Modal
            className='signin'
            onCancel={props.onClear}
            header={props.header}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<Button
                className='register-button'
                type='button'
                onClick={props.register}>
                REGISTER
             </Button>}
        >
            {props.isLoading && <LoadingSpinner asOverlay />}
            <Input
                id='username'
                label='Username'
                value={props.value.username.value}
                errorText='Please enter a your username'
                validators={[VALIDATOR_REQUIRE()]}
                type='text'
                onInput={props.onInput}
            />
            <Input
                id='password'
                label='Password'
                value={props.value.password.value}
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your password'
                type='password'
                onInput={props.onInput}
            />
            {props.children}
            <Button
                disabled={disabled}
                className='signin-button'
                onSubmit={props.signin}>
                SIGN IN
             </Button>
            <h4>New customer?</h4>
            <p>Registering is quick and easy</p>
        </Modal>
    )
}

export default Signin;

