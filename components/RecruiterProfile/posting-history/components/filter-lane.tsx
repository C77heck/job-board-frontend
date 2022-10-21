import { useEffect } from 'react';
import { Pagination } from '../../../../shared/components/paginator/paginator';
import { CONSTANTS } from '../../../../shared/constants';
import { Form } from '../../../../shared/form/form';
import { Input } from '../../../../shared/form/inputs/input';
import { useClient } from '../../../../shared/hooks/client.hook';
import { useForm } from '../../../../shared/hooks/reducers/form-reducer.hook';
import { Sort } from './sort-header';

export interface FilterLaneProps {
    passData: (data: any) => void;
    sort: Sort | null;
    pagination: Pagination | null;
}

export const FilterLane = (props: FilterLaneProps) => {
    const { INPUTS: { DROPDOWN } } = CONSTANTS;
    const { inputState: { inputs }, inputHandler, isFormValid, destroy, getPayload } = useForm({
        inputs: {
            search: {
                value: '',
                valid: false
            },
            status: {
                value: '',
                valid: false
            },
            from: {
                value: '',
                valid: false
            },
            till: {
                value: '',
                valid: false
            }
        },
        isFormValid: false
    });

    const client = useClient();

    const fetchJobs = async () => {
        try {
            const response = await client.client('/users/recruiter/get-ads', 'GET', undefined, { pagination: props.pagination, sort: props?.sort });

            if (!response || !response?.items) {
                throw new Error('Something went wrong');
            }

            props.passData(response);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        (async () => await fetchJobs())();
    }, []);

    useEffect(() => {
        (async () => await fetchJobs())();
    }, [props.sort, props.pagination]);

    return <Form
        isFormValid={isFormValid}
        noSuccessModal={true}
        noErrorModal={true}
        onSubmit={() => fetchJobs()}
        submitButton={{ className: 'h-px-34 letter-spacing-3 fs-14 hover-opacity w-px-145', title: 'Filter', type: 'submit' }}
        buttonWrapper={'mt-20 display-flex align-items-end'}
        className={'row justify-content-space-between'}
        {...client}
    >
        <div className={'col-17 mx-3'}>
            <Input
                value={inputs.search.value}
                name={'search'}
                label={'Search'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                wrapperClasses={'h-px-33'}
                onChange={inputHandler}
            />
        </div>
        <div className={'col-17 mx-3'}>
            <Input
                value={inputs.status.value}
                name={'status'}
                label={'Status'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                wrapperClasses={'h-px-33'}
                onChange={inputHandler}
                element={DROPDOWN}
            />
        </div>
        <div className={'col-17 mx-3'}>
            <Input
                value={inputs.from.value}
                name={'from'}
                label={'From'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                wrapperClasses={'h-px-33'}
                onChange={inputHandler}
            />
        </div>
        <div className={'col-17 mx-3'}>
            <Input
                value={inputs.till.value}
                name={'till'}
                label={'Till'}
                validators={[]}
                className={'col-100 mt-11'}
                labelClass={'fs-15 fw--700 mb-2'}
                wrapperClasses={'h-px-33'}
                onChange={inputHandler}
            />
        </div>
    </Form>;
};
