import { useEffect } from 'react';
import { CONSTANTS } from '../../../../shared/constants';
import { Field } from '../../../../shared/form/field';
import { Form } from '../../../../shared/form/form';
import { FormStructure } from '../../../../shared/form/form.structure';
import { Input } from '../../../../shared/form/input';
import { useClient } from '../../../../shared/hooks/client';

export interface FilterLaneProps {
    passData: (data: any) => void;
}

export const FilterLane = (props: FilterLaneProps) => {
    const { INPUTS: { DROPDOWN } } = CONSTANTS;
    const form = new FormStructure({
        search: new Field({
            name: 'search',
            label: 'Search',
            value: '',
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            wrapperClasses: 'h-px-33',
        }),
        status: new Field({
            name: 'status',
            label: 'Status',
            value: '',
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            wrapperClasses: 'h-px-33',
            options: [],
            element: DROPDOWN,
        }),
        from: new Field({
            name: 'from',
            label: 'From',
            value: '',
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            wrapperClasses: 'h-px-33',
        }),
        till: new Field({
            name: 'till',
            label: 'Till',
            value: '',
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            wrapperClasses: 'h-px-33',
        }),
    }, 'job-filters');
    const client = useClient();

    const fetchJobs = async (query?: any) => {
        try {
            const pagination = query?.pagination ? query?.pagination : {};
            const response = await client.client('/users/recruiter/get-ads', 'GET', undefined, { pagination });

            if (!response || !response?.items) {
                throw new Error('SomethingWentWrong');
            }

            props.passData(response);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => await fetchJobs())();
    }, []);

    return <Form
        noModals={true}
        onSubmit={(payload: any) => fetchJobs(payload)}
        form={form}
        submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-17 margin-auto', title: 'Filter', type: 'submit' }}
        className={'row max-width-800 justify-content-space-between'}
        {...client}
    >
        <div className={'col-17 mx-3'}>
            <Input {...form?.fields?.search} namespace={form.namespace}/>
        </div>
        <div className={'col-17 mx-3'}>
            <Input {...form?.fields?.status} namespace={form.namespace}/>
        </div>
        <div className={'col-17 mx-3'}>
            <Input {...form?.fields?.from} namespace={form.namespace}/>
        </div>
        <div className={'col-17 mx-3'}>
            <Input {...form?.fields?.till} namespace={form.namespace}/>
        </div>
    </Form>;
};
