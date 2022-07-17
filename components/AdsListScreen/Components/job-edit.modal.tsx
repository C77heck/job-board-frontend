import React, { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/buttons/button';
import { EditIcon } from '../../../shared/components/icons/icons';
import { EditModal } from '../../../shared/form/edit-modal';
import { JobForm } from '../../RecruiterProfile/forms/job.form';

export const JobEditModal = (props: any) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(show);
    }, [show]);

    return <div>
        <Button
            onClick={() => setShow(true)}
            title={<EditIcon className={'hover-opacity'} width={20}/>}
            buttonStyle={'transparent'}
        />
        <EditModal
            show={show}
            content={<JobForm/>}
            title={'Edit post'}
            onClick={(show) => setShow(show)}
        />
    </div>;
};
