import { Form } from '../../../shared/form/form';
import { Input } from '../../../shared/form/inputs/input';
import { useClient } from '../../../shared/hooks/client.hook';
import { useForm } from '../../../shared/hooks/reducers/form-reducer.hook';

const Search = (props: any) => {
    const client = useClient();
    const { inputState: { inputs }, inputHandler, isFormValid, getPayload } = useForm({
        inputs: {
            what: {
                value: '',
                valid: false
            },
            where: {
                value: '',
                valid: false
            }
        },
        isFormValid: false
    });

    const search = () => {
        console.log('sending the request to where should go', getPayload(inputs));
    };

    return <div className={'search-box position-center h-px-166 w-90 mt-170'}>
        <Form
            isFormValid={isFormValid}
            className={'w-90 row justify-content-space-around align-items-end pb-22'}
            onSubmit={async () => await search()}
            submitButton={{ title: 'Find', buttonStyle: 'submit', className: 'w-px-145 h-px-40' }}
            buttonWrapper={'col-20'}
            {...client}
        >
            <Input
                name={'what'}
                label={'What'}
                validators={[]}
                className={'col-30'}
                wrapperClasses={'border-radius-6'}
                placeholder={'Job title, skill or company...'}
                labelClass={'fs-21 letter-spacing-3 color--light mb-3'}
                onChange={inputHandler}
                value={inputs.what.value}
            />
            <Input
                name={'where'}
                label={'Where'}
                validators={[]}
                className={'col-30'}
                wrapperClasses={'border-radius-6'}
                placeholder={'Town, city or postcode'}
                labelClass={'fs-21 letter-spacing-3 color--light mb-3'}
                onChange={inputHandler}
                value={inputs.where.value}
            />
        </Form>
    </div>;
};

export default Search;
