import React from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { CompanyDataForm } from './forms/company-data.form';
import { SafeRecruiterData } from './libs/recruiter.data.document';

export interface CompanyPresenterProps {
    data: SafeRecruiterData;
    enableEdit?: boolean;
}

export class CompanyPresenter extends React.Component<CompanyPresenterProps, any> {
    public renderModalContent() {
        return <CompanyDataForm endpoint={'/users/recruiter/update'} method={'PUT'} data={this.props.data}/>;
    }

    public render() {
        const { logo, description, company_name, address } = this.props.data;

        return <BoxWrapper
            content={this.renderModalContent()}
            className={'h-100 max-width-800'}
            enableEdit={this.props.enableEdit}
            form={this.props.data}
        >
            <h6 className={'fw-700 text--small mb-15'}>Company data</h6>
            <div className={'row'}>
                <div className={'col-50'}>
                    <div className={'logo-presenter'}>
                        <img src={logo.data as string}/>
                    </div>
                    <DataPresenter className={'my-15'} key={`${company_name.data}`} data={company_name.data} label={company_name.label}/>
                    <DataPresenter className={'my-15'} key={`${address.data}`} data={address.data} label={address.label}/>
                </div>

                <div className={'col-50'}>
                    <DataPresenter key={`${description.data}`} data={description.data} label={description.label}/>
                </div>
            </div>
        </BoxWrapper>;
    }
};
