import { useContext } from 'react';
import { AuthContext } from '../../shared/contexts/auth.context';
import { useAuthContext } from '../../shared/hooks/context-hooks/auth-context.hook';
import { CompanyPresenter } from './company-presenter';
import { RecruiterDataDocument } from './libs/recruiter.data.document';

export const UserData = ({ filters }: any) => {
    const { userData } = useAuthContext();
    const userDocument = new RecruiterDataDocument(userData);

    return <div className={'row justify-content-space-between'}>
        <div className={'col-100 mt-20 mb-50 position-center'}>
            <CompanyPresenter data={userDocument} enableEdit={true}/>
        </div>
    </div>;
};
