import type { NextPage } from 'next';
import { Field } from '../shared/form/field';
import { Form } from '../shared/form/form';
import { FormStructure } from '../shared/form/form.structure';
import { Input } from '../shared/form/input';
import { useClient } from '../shared/hooks/client';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {
    const client = useClient();
    const form = new FormStructure({
        first: new Field({
            name: 'first',
            label: 'First',
            value: null,
            validators: [],
            className: 'col-100',
        }),
        second: new Field({
            name: 'second',
            label: 'Second',
            value: null,
            validators: [],
            className: 'col-100',
        }),
        third: new Field({
            name: 'third',
            label: 'Third',
            value: null,
            validators: [],
            className: 'col-100',
        }),
    }, 'basic-one');

    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}> its my home page</h1>
        <div className={'w-100 position-center'}>
            <Form
                form={form}
                className={'w-30'}
                onSubmit={(payload: any) => console.log(payload)}
                submitButton={{ title: 'submit', buttonStyle: 'submit' }}
                {...client}
            >
                <Input {...form?.fields?.first} namespace={form.namespace}/>
                <Input {...form?.fields?.second} namespace={form.namespace}/>
                <Input {...form?.fields?.third} namespace={form.namespace}/>
            </Form>
        </div>

    </BaseLayout>;
};

export default Home;
