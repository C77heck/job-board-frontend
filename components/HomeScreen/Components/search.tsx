import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { Input } from '../../../shared/form/input';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { useClient } from '../../../shared/hooks/client';

const Search = (props: any) => {
    const client = useClient();
    const form = new FormStructure({
        what: new Field({
            name: 'what',
            label: 'What',
            value: null,
            validators: [],
            className: 'col-30',
            labelClass: 'fs-21 letter-spacing-3 text-color--light-1 mb-3',
            inputClasses: 'h-px-35',
            wrapperClasses: 'border-radius-6',
            placeholder: 'Job title, skill or company...',
        }),
        where: new Field({
            name: 'where',
            label: 'Where',
            value: null,
            validators: [],
            className: 'col-30',
            labelClass: 'fs-20 letter-spacing-3 text-color--light-1 mb-3',
            inputClasses: 'h-px-35',
            wrapperClasses: 'border-radius-6',
            placeholder: 'Town, city or postcode',
        }),
    }, 'search-role-by-geolocation');

    const search = (payload: any) => {
        console.log('sending the request to where should go', payload);
    };

    return <div className={'search-box position-center h-px-166 w-70 mt-170'}>
        <Form
            form={form}
            className={'w-90 row justify-content-space-around align-items-end pb-22'}
            onSubmit={(payload: any) => search(payload)}
            submitButton={{ title: 'Find', buttonStyle: 'submit', className: 'col-20' }}
            {...client}
        >
            <Input {...form?.fields?.what} namespace={form.namespace}/>
            <Input {...form?.fields?.where} namespace={form.namespace}/>
        </Form>
    </div>;
};

export default Search;
