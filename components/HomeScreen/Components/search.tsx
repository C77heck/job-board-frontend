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
            validators: [requiredValidator],
            className: 'col-30',
            labelClass: 'fs-20',
            inputClasses: 'h-px-35',
        }),
        where: new Field({
            name: 'where',
            label: 'Where',
            value: null,
            validators: [requiredValidator],
            className: 'col-30',
            labelClass: 'fs-20',
            inputClasses: 'h-px-35',
        }),
    }, 'search-role-by-geolocation');

    const search = (payload: any) => {
        console.log('sending the request to where should go', payload);
    };

    return <div className={'search-box position-center h-px-166 w-61'}>
        <Form
            form={form}
            className={'w-80 row justify-content-space-around align-items-end pb-22'}
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
