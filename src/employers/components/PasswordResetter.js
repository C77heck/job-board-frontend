import React, { useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';

import {
    VALIDATOR_EMAIL
} from '../../shared/utility/validators';

const baseMessage = 'Please provide your email address and we'
    +
    ' will send you a password recovery link';

const PasswordModal = props => {
    const [display, setDisplay] = useState('unset')

    useEffect(() => {
        if (props.message === '') {
            setDisplay('unset')
        } else {
            setDisplay('none')
        }
    }, [props.message])

    const style = {
        display: display
    }

    return (
        <Modal
            className='password-recovery__modal'
            header='Password assistance'
            onCancel={props.onClear}
            show={props.show}
            onSubmit={props.onSubmit}
        >
            <p>{props.message === '' ? baseMessage : props.message}</p>
            <Input
                id='email'
                label='Your Email'
                errorText='Please enter a valid email address'
                value={props.value}
                validators={[VALIDATOR_EMAIL()]}
                type='text'
                onInput={props.onInput}
                containerStyle={style}
            />
            <Button
                disabled={!props.disabled ? true : false}
                style={style}
            >
                Send link
             </Button>
        </Modal>
    )
}

const PasswordResetter = props => {
    return (
        <PasswordModal
            onClear={props.onClear}
            show={props.show}
            onSubmit={props.onSubmit}
            onInput={props.onInput}
            value={props.value}
            message={props.message}
            disabled={props.disabled}
        />
    )

}


export default PasswordResetter;
