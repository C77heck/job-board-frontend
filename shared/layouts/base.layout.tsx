import { NavBar } from '../../shared/components/navigation/navbar';
import { Auth } from '../components/auth/auth';
import { Footer } from '../components/navigation/footer/footer';
import { AuthContextWrapper } from '../contexts/wrappers/auth-context.wrapper';
import { FormContextWrapper } from '../contexts/wrappers/form-context.wrapper';
import { SessionContextWrapper } from '../contexts/wrappers/sesssion-context.wrapper';
import { Meta } from './meta';

export const BaseLayout = (props: { children: any; auth: boolean; meta: Meta; className?: string; }) => {

    return <>
        <Meta {...props.meta}/>
        <SessionContextWrapper>
            <AuthContextWrapper>
                <FormContextWrapper>
                    <NavBar/>
                    <main className={`position-center ${props.className}`}>
                        {props.auth ? <Auth>{props.children}</Auth> : props.children}
                    </main>
                </FormContextWrapper>
            </AuthContextWrapper>
        </SessionContextWrapper>
        <Footer/>
    </>;
};
