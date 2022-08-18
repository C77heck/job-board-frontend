import { useEffect, useState } from 'react';
import { QueryManager } from '../../../libs/query.manager';
import { Button } from '../../buttons/button';
import { MagnifyingGlassIcon } from '../../icons/icons';
import { Hr } from '../../ui-misc/hr';
import { NavLink } from '../libs/nav-link';

export const SearchBar = (props: { show?: boolean }) => {
    const [data, setData] = useState({
        what: '',
        where: ''
    });
    const query = new QueryManager('');
    const [base64Query, setBase64Query] = useState('');

    useEffect(() => {
        query.addObj(data);
        setBase64Query(query.encodeBase64());
    }, [data]);

    if (!props.show) {
        return null;
    }

    return <div className={'position-center w-100'}>
        <div className={'position-center'}>
            <MagnifyingGlassIcon className={'pr-10 pt-5'} width={20}/>
            <div className={'navigation-search-bar w-100 position-center'}>
                <div className={'navigation-search-input-wrappers'}>
                    <div>
                        <input
                            value={data.what}
                            type={'text'}
                            placeholder={'Job title, skill or company...'}
                            onChange={(e) => setData({ ...data, what: e?.target?.value })}/>
                    </div>
                    <Hr className={'mx-7'} type={'vertical'}/>
                    <div>
                        <input
                            value={data.where}
                            type={'text'}
                            placeholder={'Town, city or postcode'}
                            onChange={(e) => setData({ ...data, where: e?.target?.value })}/>
                    </div>
                </div>
                <NavLink href={`/ads-list?${base64Query}`}>
                    <Button title={'Find'} buttonStyle={'navbar-search-button'} className={''}/>
                </NavLink>
            </div>
        </div>
    </div>;
};
