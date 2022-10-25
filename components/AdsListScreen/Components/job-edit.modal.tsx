import React, { useState } from 'react';
import { Button } from '../../../shared/components/buttons/button';
import { EditIcon } from '../../../shared/components/icons/icons';
import { EditModal } from '../../../shared/form/edit-modal';
import { JobForm } from '../../RecruiterProfile/forms/job.form';
import { JobCardProps } from './job-card';

export interface JobEditModalProps{
    inputs: JobCardProps
}

export const JobEditModal = (props: JobEditModalProps) => {
    const [show, setShow] = useState(false);

    return <div>
        <Button
            onClick={() => setShow(true)}
            title={<EditIcon className={'hover-opacity'} width={20}/>}
            buttonStyle={'transparent'}
        />
        <EditModal
            show={show}
            content={<JobForm inputs={props.inputs} endpoint={`/users/recruiter/update-ad/${props.inputs._id}`} isUpdate={true} method={'PUT'}/>}
            title={'Edit post'}
            onClick={(show) => setShow(show)}
        />
    </div>;
};
