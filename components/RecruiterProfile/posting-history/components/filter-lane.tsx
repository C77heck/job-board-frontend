import { useEffect } from 'react';
import { Pagination } from '../../../../shared/components/paginator/paginator';
import { CONSTANTS } from '../../../../shared/constants';
import { Field } from '../../../../shared/form/field';
import { Form } from '../../../../shared/form/form';
import { FormStructure } from '../../../../shared/form/form.structure';
import { Input } from '../../../../shared/form/input';
import { useClient } from '../../../../shared/hooks/client';
import { Sort } from './sort-header';

export interface FilterLaneProps {
    passData: (data: any) => void;
    sort: Sort | null;
    pagination: Pagination | null;
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
        noSuccessModal={true}
        noErrorModal={true}
        onSubmit={(payload: any) => fetchJobs()}
        form={form}
        submitButton={{ className: 'h-px-34 letter-spacing-3 fs-14 hover-opacity', title: 'Filter', type: 'submit' }}
        buttonWrapper={'mt-20 display-flex align-items-end'}
        className={'row justify-content-space-between'}
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
