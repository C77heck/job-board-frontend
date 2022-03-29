import type { NextPage } from 'next';
import Search from '../components/HomeScreen/Components/search';
import { Field } from '../shared/form/field';
import { Form } from '../shared/form/form';
import { FormStructure } from '../shared/form/form.structure';
import { Input } from '../shared/form/input';
import { requiredValidator } from '../shared/form/validators/required-validator';
import { useClient } from '../shared/hooks/client';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {

    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}> its my home page</h1>
        <Search/>
    </BaseLayout>;
};

export default Home;
