import React from 'react';
import { JobCardProps } from '../../AdsListScreen/Components/job-card';
import { Post } from './components/post';

export const Listing = (props: { posts: JobCardProps[] }): JSX.Element => {
    if (!props?.posts || !props?.posts.length) {
        return <div className={'w-100 pb-30'}>
            <h6 className={'fw-700 text--small'}>Empty list</h6>
        </div>;
    }

    const header = <div className={'row w-100 py-15'}>
        <div className={'col-18 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Title</span>
        </div>
        <div className={'col-17 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Salary</span>
        </div>
        <div className={'col-16 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Location</span>
        </div>
        <div className={'col-17 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Posted at</span>
        </div>
        <div className={'col-16 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Description</span>
        </div>
        <div className={'col-16 position-center'}>
            <span className={'uppercase fs-16 fw--700'}>Edit</span>
        </div>
    </div>;

    return <div className={'display-flex flex-column w-100 py-30'}>
        {header}
        {props.posts.map(post => <Post key={post?._id} {...post}/>)}
    </div>;
};
