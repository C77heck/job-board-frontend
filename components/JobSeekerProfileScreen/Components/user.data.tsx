import { useContext } from 'react';
import { ProfileBox } from '../../../shared/components/ui-misc/profile-box';
import { AuthContext } from '../../../shared/contexts/auth.context';
import { UserDataDocument } from '../libs/user.data.document';
import { PhotoBox } from './photo.box';

export const UserData = ({ filters }: any) => {
    const { userData } = useContext(AuthContext);
    const userDocument = new UserDataDocument(userData);
    const { description, email, first_name, last_name, images, logo, meta } = userDocument;

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
            <PhotoBox
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
