export interface ProfileItem {
    label: string;
    data: string | string[];
}

export interface SafeUserData {
    first_name: ProfileItem;
    last_name: ProfileItem;
    email: ProfileItem;
    isRecruiter: boolean;
    description: ProfileItem;
    logo: ProfileItem;
    meta: any;
    images: ProfileItem;
}

export class UserDataDocument implements SafeUserData {
    public first_name = { label: 'First name', data: '' };
    public last_name = { label: 'Last name', data: '' };
    public email = { label: 'Email', data: '' };
    public isRecruiter = false;
    public description = { label: 'Description', data: '' };
    public logo = { label: 'Logo', data: 'First name' };
    public meta = '-';
    public images = { label: 'Uploaded images', data: [''] };

    public constructor(userData: any) {
        if (userData) {
            this.first_name.data = userData?.first_name || '-';
            this.last_name.data = userData?.last_name || '-';
            this.email.data = userData?.email || '-';
            this.isRecruiter = userData.isRecruiter;
            this.description.data = userData?.description || '';
            this.logo.data = userData?.logo || '';
            this.meta = userData?.meta || '';
            this.images.data = userData?.images || [''];
        }
    }
}
