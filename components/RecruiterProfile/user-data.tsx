import { useContext } from 'react';
import { ProfileBox } from '../../shared/components/ui-misc/profile-box';
import { AuthContext } from '../../shared/contexts/auth.context';
import { CompanyPresenter } from './company-presenter';
import { RecruiterDataDocument } from './libs/recruiter.data.document';
import { PhotoBox } from './photo-box';

export const UserData = ({ filters }: any) => {
    const { userData } = useContext(AuthContext);
    const userDocument = new RecruiterDataDocument(userData);

    return <div className={'row justify-content-space-between'}>
        <div className={'col-30 mt-20 mb-50'}>
            <CompanyPresenter
                form={userDocument}
                data={userDocument}
                enableEdit={true}
            />
        </div>
        <div className={'col-30 mt-20 mb-50'}>
            <PhotoBox
                form={userDocument}
                images={userDocument.images}
                enableEdit={true}
                header={'Profile data'}
            />
        </div>
        <div className={'col-30 mt-20 mb-50'}>
            <ProfileBox
                form={userDocument}
                profileItems={[userDocument.meta]}
                enableEdit={true}
                header={'Profile data'}
            />
        </div>
    </div>;
};
