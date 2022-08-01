import React from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { ProfileBoxForm } from '../JobSeekerProfileScreen/Components/forms/profile-box.form';
import { CompanyDataForm } from './forms/company-data.form';
import { SafeRecruiterData } from './libs/recruiter.data.document';

export interface CompanyPresenterProps {
    data: SafeRecruiterData;
    enableEdit?: boolean;
    form: any;
}

export class CompanyPresenter extends React.Component<CompanyPresenterProps, any> {
    public renderModalContent() {
        return <CompanyDataForm data={this.props.form}/>;
    }

    public render() {
        const { logo, description, company_name, address } = this.props.data;
        return <BoxWrapper
            content={this.renderModalContent()}
            className={'h-100'}
            enableEdit={this.props.enableEdit}
            form={this.props.form}
        >
            <h6 className={'fw-700 text--small mb-15'}>Company data</h6>
            <div className={'row'}>
                <div className={'col-50'}>
                    <div className={'logo-presenter'}>
                        <img src={"https://thumbs.dreamstime.com/z/logo-bird-company-icon-business-design-abstract-nature-vector-flying-background-symbol-illustration-template-sky-modern-white-148065023.jpg"}/>
                    </div>
                </div>
                <div className={'col-50'}>
                    <DataPresenter key={`${company_name.data}`} data={company_name.data} label={company_name.label}/>
                </div>
                <div className={'col-100'}>
                    <DataPresenter key={`${address.data}`} data={address.data} label={address.label}/>
                </div>
                <div className={'col-100'}>
                    <DataPresenter key={`${description.data}`} data={description.data} label={description.label}/>
                </div>
            </div>
        </BoxWrapper>;
    }
};
