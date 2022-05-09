import { NavBar } from '../../shared/components/navigation/navbar';
import { Auth } from '../components/auth/auth';
import { Footer } from '../components/navigation/footer/footer';
import { AuthContextWrapper } from '../contexts/wrappers/auth-context.wrapper';
import { FormContextWrapper } from '../contexts/wrappers/form-context.wrapper';
import { Meta } from './meta';

export const BaseLayout = (props: { children: any; auth: boolean; meta: Meta }) => {

    return <>
        <Meta {...props.meta}/>
        <AuthContextWrapper>
            <FormContextWrapper>
                <NavBar/>
                <main className={'position-center'}>
                    {props.auth ? <Auth>{props.children}</Auth> : props.children}
                </main>
            </FormContextWrapper>
        </AuthContextWrapper>
        <Footer/>
    </>;
};
