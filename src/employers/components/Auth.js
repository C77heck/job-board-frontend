import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';

import Signin from './Signin';
import Signup from './Signup';
import SuccesfulSignup from './SuccesfulSignup';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import PasswordResetter from './PasswordResetter';

import './Auth.scss'



const Auth = props => {

    const { error, clearError, isLoading, sendRequest, applicationError } = useHttpClient();
    const { isLoggedIn, signin } = useContext(AuthContext);

    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false);
    const [forgottenPass, setForgottenPass] = useState(false)
    const [message, setMessage] = useState('')
    const [signedup, setSignedup] = useState(false);
    const [coordinates, setCoordinates] = useState();



    const [inputState, inputHandler, isFormValid] = useForm({
        fName: {
            value: '',
            valid: false
        },
        surname: {
            value: '',
            valid: false
        },
        email: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: false
        },
        passwordAgain: {
            value: '',
            valid: false
        },
        username: {
            value: '',
            valid: false
        },
        city: {
            value: '',
            valid: false
        },
        answer: {
            value: '',
            valid: false
        }
    })

    const [question, setQuestion] = useState({
        value: '',
        valid: false
    });

    const onChangeHandler = e => {
        const value = e.target.value;
        if (value !== '0') {
            setQuestion({
                value: value,
                valid: true
            })
        }
    };


    const forgottenHandler = () => {
        setClickedSignIn(false)
        setForgottenPass(true)
    }

    const forgottenClose = () => {
        setForgottenPass(false)
        setMessage('')
    }

    const signinModalHandler = () => {
        setClickedSignIn(true)
        setRegistering(false)

    }

    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)
        setForgottenPass(false)
    }
    const register = () => {
        setClickedSignIn(false)
        setRegistering(true)
        setForgottenPass(false)
    }

    const signedupSuccessToClose = () => {
        setSignedup(false)
    }
    const signinHandler = async e => {
        e.preventDefault();

        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_AUTH,
                'POST',
                JSON.stringify({
                    username: inputState.inputs.username.value,
                    password: inputState.inputs.password.value
                })
            )
            signInClose()
            setMessage(responseData.message);

        } catch (err) {
            console.log(err)
        }



    }

    const signupHandler = async e => {
        e.preventDefault();
        try {
            if (!question.valid) {
                throw new Error('Please pick a security question!')
            }
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNUP,
                'POST',
                JSON.stringify({
                    first_name: inputState.inputs.fName.value,
                    last_name: inputState.inputs.surname.value,
                    email: inputState.inputs.email.value,
                    password: inputState.inputs.password.value,
                    username: inputState.inputs.username.value,
                    city: inputState.inputs.city.value,
                    hint: question.value,
                    answer: inputState.inputs.answer.value
                })
            )
            console.log(responseData)

            // signin(responseData.userData);
            signInClose();
            //setSignedup(true)
        } catch (err) {
            // applicationError(err.message)
            console.log(err, {
                first_name: inputState.inputs.fName.value,
                last_name: inputState.inputs.surname.value,
                email: inputState.inputs.email.value,
                password: inputState.inputs.password.value,
                username: inputState.inputs.username.value,
                city: inputState.inputs.city.value,
                hint: question.value,
                answer: inputState.inputs.answer.value
            })

        }
    }

    const passwordLinkHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_RECOVERY,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value
                }),
                { 'Content-Type': 'application/json' }
            );
            setMessage(responseData.message)
        } catch (err) {
            setForgottenPass(false)
        }

    }

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />

            <Signin
                header='login required'
                show={clickedSignIn}
                onClear={signInClose}
                register={register}
                onSubmit={signinHandler}
                onInput={inputHandler}
                value={inputState.inputs}
                disabled={isFormValid}
                isLoading={isLoading}
            >
                <button
                    type='button'
                    onClick={forgottenHandler}
                    className='forgot-password'
                >forgot password?</button>
            </Signin>
            <PasswordResetter
                onClear={forgottenClose}
                show={forgottenPass}
                value={inputState.inputs.email.value}
                onInput={inputHandler}
                onSubmit={passwordLinkHandler}
                message={message}
                disabled={inputState.inputs.email.valid}
                isLoading={isLoading}
            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onSubmit={signupHandler}
                onChange={onChangeHandler}
                onInput={inputHandler}
                value={inputState.inputs}
                password={inputState.inputs.password.value}
                disabled={isFormValid}
                cancelSignup={signinModalHandler}
                isLoading={isLoading}
            />

            <SuccesfulSignup
                show={signedup}
                onClear={signedupSuccessToClose}
                marker={coordinates}
            />
            {props.register ? <div
                className={props.className}
                onClick={!isLoggedIn ? register : undefined}
            >
                {props.children}
            </div> : <div
                className={props.className}
                onClick={!isLoggedIn ? signinModalHandler : undefined}
            >
                    {props.children}
                </div>}
        </React.Fragment>
    )


}


export default Auth;