import React from 'react';
import { JobCardProps } from '../../AdsListScreen/Components/job-card';
import { Post } from './components/post';

export const Listing = (props: { posts: JobCardProps[] }): JSX.Element => {
    if (!props?.posts || !props?.posts.length) {
        return <div className={'w-100'}>
            <h6 className={'fw-700 text--small'}>Empty list</h6>
        </div>;
    }

    return <div className={'display-flex flex-column max-width-800'}>
        {props.posts.map(post => <Post key={post?._id} {...post}/>)}
    </div>;
};
