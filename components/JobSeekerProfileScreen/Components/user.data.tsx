import { useContext } from 'react';
import { AuthContext } from '../../../shared/contexts/auth.context';
import { UserDataDocument } from '../libs/user.data.document';
import { ProfileBox } from './profile-box';

export const UserData = ({ filters }: any) => {
    const { userData } = useContext(AuthContext);
    const userDocument = new UserDataDocument(userData);
    const { description, email, first_name, last_name, images, isRecruiter, logo, meta } = userDocument;

    return <div className={'row justify-content-space-between'}>
        <div className={'col-30 mt-20 mb-50'}>
            <ProfileBox
                form={userDocument}
                profileItems={[first_name, last_name, email, description]}
                enableEdit={true}
                header={'Profile data'}
            />
        </div>
        <div className={'col-30 mt-20 mb-50'}>
            <ProfileBox
                form={userDocument}
                profileItems={[first_name, last_name, email, description]}
                enableEdit={true}
                header={'Profile data'}
            />
        </div>
        <div className={'col-30 mt-20 mb-50'}>
            <ProfileBox
                form={userDocument}
                profileItems={[first_name, last_name, email, description]}
                enableEdit={true}
                header={'Profile data'}
            />
        </div>
    </div>;
};
