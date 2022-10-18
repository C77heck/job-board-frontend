import { useState } from 'react';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/old-input';
import { useClient } from '../../../shared/hooks/client.hook';

const Search = (props: any) => {
    const client = useClient();
    const [form, setForm] = useState(new FormStructure({
        what: new Field({
            name: 'what',
            label: 'What',
            value: null,
            validators: [],
            className: 'col-30',
            labelClass: 'fs-21 letter-spacing-3 color--light mb-3',
            wrapperClasses: 'border-radius-6',
            placeholder: 'Job title, skill or company...',
        }),
        where: new Field({
            name: 'where',
            label: 'Where',
            value: null,
            validators: [],
            className: 'col-30',
            labelClass: 'fs-20 letter-spacing-3 color--light mb-3',
            wrapperClasses: 'border-radius-6',
            placeholder: 'Town, city or postcode',
        }),
    }, 'search-role-by-geolocation'));

    const search = (payload: any) => {
        console.log('sending the request to where should go', payload);
    };

    return <div className={'search-box position-center h-px-166 w-90 mt-170'}>
        <Form
            form={form}
            className={'w-90 row justify-content-space-around align-items-end pb-22'}
            onSubmit={async (payload: any) => await search(payload)}
            submitButton={{ title: 'Find', buttonStyle: 'submit', className: 'w-px-145 h-px-40' }}
            buttonWrapper={'col-20'}
            {...client}
        >
            <Input {...form?.fields?.what} namespace={form.namespace}/>
            <Input {...form?.fields?.where} namespace={form.namespace}/>
        </Form>
    </div>;
};

export default Search;
