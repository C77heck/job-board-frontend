import type { NextPage } from 'next';
import { Field } from '../shared/form/field';
import { Form } from '../shared/form/form';
import { FormStructure } from '../shared/form/form.structure';
import Input from '../shared/form/input';
import { useClient } from '../shared/hooks/client';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {
    const client = useClient();
    const getData = (value: string) => {
        console.log(value);
    };
    const form = new FormStructure({
        first: new Field({
            name: 'first',
            label: 'First',
            value: null,
            validators: [],
            className: 'col-100',
            onChange: (value: string) => getData(value)
        }),
        second: new Field({
            name: 'second',
            label: 'Second',
            value: null,
            validators: [],
            className: 'col-100',
            onChange: (value: string) => getData(value)
        }),
        third: new Field({
            name: 'third',
            label: 'Third',
            value: null,
            validators: [],
            className: 'col-100',
            onChange: (value: string) => getData(value)
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
