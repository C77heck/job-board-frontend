import { useContext } from 'react';
import { NavBar } from '../../shared/components/navigation/navbar';
import { Auth } from '../components/auth/auth';
import { Footer } from '../components/navigation/footer/footer';
import { FormContext } from '../contexts/form.context';
import { ContextWrapper } from './context.wrapper';
import { Meta } from './meta';

export const BaseLayout = (props: { children: any; auth: boolean; meta: Meta }) => {
    const formContext = useContext(FormContext);

    return <>
        <Meta {...props.meta}/>
        <NavBar/>
        <ContextWrapper>
            <main>
                {props.auth ? <Auth>{props.children}</Auth> : props.children}
            </main>
            <Footer/>
        </ContextWrapper>
        <Footer/>
    </>;
};
