import { useContext } from 'react';
import { AuthContext } from '../../../shared/contexts/auth.context';
import { UserDataDocument } from '../libs/user.data.document';
import { ProfileBox } from './profile-box';

export const UserData = ({ filters }: any) => {
    const { userData } = useContext(AuthContext);
    const { description, email, first_name, last_name, images, isRecruiter, logo, meta } = new UserDataDocument(userData);
    console.log({ userData });
    return <div className={'row'}>
        <div className={'col-50'}>
            <ProfileBox profileItems={[description, email, first_name, last_name]} enableEdit={true} header={'Profile data'}/>
        </div>
    </div>;
};
