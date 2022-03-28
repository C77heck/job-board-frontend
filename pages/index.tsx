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
            id: 'first',
            name: 'first',
            label: 'First',
            value: null,
            validators: [],
            className: 'col-100',
            namespace: 'basic-one',
        }),
        second: new Field({
            id: 'second',
            name: 'second',
            label: 'Second',
            value: null,
            validators: [],
            className: 'col-100',
            namespace: 'basic-one',
        }),
        third: new Field({
            id: 'third',
            name: 'third',
            label: 'Third',
            value: null,
            validators: [],
            className: 'col-100',
            namespace: 'basic-one',
        }),
    });

    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}> its my home page</h1>
        <div className={'w-100 position-center'}>
            <Form
                form={form}
                className={'w-30'}
                onSubmit={() => console.log(form)}
                submitButton={{ title: 'submit', buttonStyle: 'submit' }}
                {...client}
            >
                <Input {...form?.fields?.first} />
                <Input {...form?.fields?.second} />
                <Input {...form?.fields?.third} />
            </Form>
        </div>

    </BaseLayout>;
};

export default Home;
