import React from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';

import './SearchBar.scss';


const SearchBar = props => {
    const { sendRequest, isLoading } = useHttpClient();
    const [inputState, inputHandler] = useForm({
        title: {
            value: '',
            valid: false
        },
        where: {
            value: '',
            valid: false
        },
        category: {
            value: '',
            valid: false
        }
    });


    const onSubmitHandler = async e => {
        e.preventDefault();

        try {
            const responseData = await sendRequest(process.env.REACT_APP_SEARCH,
                'POST',
                JSON.stringify({
                    title: inputState.inputs.title.value,
                    where: inputState.inputs.place.value,
                    category: inputState.inputs.category.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )

            //will need context data to grab and set so on routing it will display results
        } catch (err) {

        }
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className='search'>
                <Input
                    id='title'
                    label='Job title'
                    onInput={inputHandler}
                    value={inputState.inputs.title.value}
                    validators={[]}
                    type='text'
                />
                <Input
                    id='where'
                    label='Where'
                    onInput={inputHandler}
                    value={inputState.inputs.where.value}
                    validators={[]}
                    type='text'
                />
                <Input
                    id='category'
                    label='Category'
                    onInput={inputHandler}
                    value={inputState.inputs.category.value}
                    validators={[]}
                    type='text'
                />
                <Button>Search</Button>
            </div>
        </form>
    );
}


export default SearchBar;