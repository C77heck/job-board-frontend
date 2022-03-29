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
            className: 'col-100',
        }),
        where: new Field({
            name: 'where',
            label: 'Where',
            value: null,
            validators: [requiredValidator],
            className: 'col-100',
        }),
    }, 'search-role-by-geolocation');

    const search = (payload: any) => {
        console.log(payload);
    };

    return <div className={'w-100 position-center'}>
        <Form
            form={form}
            className={'w-30'}
            onSubmit={(payload: any) => search(payload)}
            submitButton={{ title: 'Find', buttonStyle: 'submit' }}
            {...client}
        >
            <Input {...form?.fields?.what} namespace={form.namespace}/>
            <Input {...form?.fields?.where} namespace={form.namespace}/>
        </Form>
    </div>;
};

export default Search;
