export interface ProfileItem {
    label: string;
    data: string | string[];
}

export interface SafeRecruiterData {
    company_name: ProfileItem;
    address: ProfileItem;
    email: ProfileItem;
    description: ProfileItem;
    logo: ProfileItem;
    meta: any;
    images: ProfileItem;
}

export class RecruiterDataDocument implements SafeRecruiterData {
    public company_name = { label: 'Company name', data: '' };
    public email = { label: 'Email', data: '' };
    public address = { label: 'Address', data: '' };
    public description = { label: 'Description', data: '' };
    public logo = { label: 'Logo', data: 'First name' };
    public meta = '-';
    public images = { label: 'Uploaded images', data: [''] };

    public constructor(userData: any) {
        if (userData) {
            this.company_name.data = userData?.company_name || '-';
            this.email.data = userData?.email || '-';
            this.address.data = userData?.address || '-';
            this.description.data = userData?.description || '';
            this.logo.data = userData?.logo || '';
            this.meta = userData?.meta || '';
            this.images.data = userData?.images || [''];
        }
    }
}
