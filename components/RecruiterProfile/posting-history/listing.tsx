import React from 'react';
import { JobCardProps } from '../../AdsListScreen/Components/job-card';
import { Post } from './components/post';
import { Sort, SortHeader } from './components/sort-header';

export const Listing = (props: { posts: JobCardProps[], onChange: (sort: Sort) => void; }): JSX.Element => {
    if (!props?.posts || !props?.posts.length) {
        return <div className={'w-100 pb-30'}>
            <h6 className={'fw-700 text--small'}>Empty list</h6>
        </div>;
    }

    const header = <div className={'row w-100 py-15 px-13'}>
        <div className={'col-20 position-center'}>
            <SortHeader align={'left'} onChange={props.onChange} title={'Title'} property={'title'}/>
        </div>
        <div className={'col-20 position-center'}>
            <SortHeader align={'left'} onChange={props.onChange} title={'Salary'} property={'salary'}/>
        </div>
        <div className={'col-17 position-center'}>
            <SortHeader align={'left'} onChange={props.onChange} title={'Location'} property={'location'}/>
        </div>
        <div className={'col-17 position-center'}>
            <SortHeader align={'left'} onChange={props.onChange} title={'Posted at'} property={'created_at'}/>
        </div>
        <div className={'col-13 position-center'}>
            <SortHeader disabled={true} title={'Status'}/>
        </div>
        <div className={'col-13 position-center'}>
            <SortHeader disabled={true} title={'Edit'}/>
        </div>
    </div>;

    return <div className={'display-flex flex-column w-100 py-30'}>
        {header}
        {props.posts.map(post => <Post key={post?._id} {...post}/>)}
    </div>;
};
