import { NavBar } from '../../shared/components/navigation/navbar';
import { Auth } from '../components/auth/auth';
import { Footer } from '../components/navigation/footer/footer';
import { Spinner } from '../components/spinner/spinner';
import { AuthContextWrapper } from '../contexts/wrappers/auth-context.wrapper';
import { SessionContextWrapper } from '../contexts/wrappers/sesssion-context.wrapper';
import { Meta } from './meta';

export interface BaseLayoutProps {
    showSearchBar?: boolean;
    children: any;
    auth: boolean;
    meta: Meta;
    className?: string;
    isLoading?: boolean;
}

export const BaseLayout = (props: BaseLayoutProps) => {
    return <>
        <Meta {...props.meta}/>
        <SessionContextWrapper>
            <AuthContextWrapper>
                <NavBar showSearchBar={props.showSearchBar}/>
                <main className={`position-center ${props.className}`}>
                    <Spinner asOverlay={true} isLoading={props.isLoading}/>
                    {props.auth ? <Auth>{props.children}</Auth> : props.children}
                </main>
            </AuthContextWrapper>
        </SessionContextWrapper>
        <Footer/>
    </>;
};
