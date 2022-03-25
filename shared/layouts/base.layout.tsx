import { NavBar } from '../../shared/components/navigation/navbar';
import { Auth } from '../components/auth/auth';
import { Footer } from '../components/navigation/footer/footer';
import { Meta } from './meta';

export const BaseLayout = (props: { children: any; auth: boolean; meta: Meta }) => {
    return <>
        <Meta {...props.meta}/>
        <NavBar/>
        <main>
            {props.auth ? <Auth>{props.children}</Auth> : props.children}
        </main>

        <Footer/>
    </>;
};
