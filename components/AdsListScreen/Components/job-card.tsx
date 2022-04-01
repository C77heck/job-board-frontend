import { Button } from '../../../shared/components/buttons/button';
import { FavouriteIcon } from '../../../shared/components/icons/icons';
import { formatLongText } from '../../../shared/libs/helpers';
import { Job } from './job-listings';

export interface JobCardProps extends Job {
    className?: string;
}

export const JobCard = ({ title, date, description, location, salary, className }: JobCardProps) => {
    return <div className={`${className} display-flex flex-column pb-8 job-board py-10 px-20`}>
        <div className={'display-flex justify-content-space-between'}>
            <h2 className={'fs-19 fw--700 pb-3 text-color--secondary-1'}>{title}</h2>
            <Button title={<FavouriteIcon width={25} className={'text-color--dark hover-secondary'}/>} buttonStyle={'transparent'}/>
        </div>
        <h2 className={'fs-17 fw--700'}>{salary}</h2>
        <h2 className={'fs-15 fw--400'}>{date}</h2>
        <p className={'fs-15 fw--500'}>{location}</p>
        <p className={'fs-13 fw--400 pt-16'}>{formatLongText(description, 420)}</p>
    </div>;
};
