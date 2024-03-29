import Head from 'next/head';

export interface Meta {
    title: string;
    keywords: string;
    description: string;
}

export const Meta = ({ title, keywords, description }: Meta) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="keywords" content={keywords}/>
            <meta name="description" content={description}/>
            <meta charSet="utf-8"/>
            <link rel="icon" href="/favicon.ico"/>
            <title>{title}</title>
        </Head>
    );
};

// see the purpose of this later
Meta.defaultProps = {
    title: 'WebDev Newz',
    keywords: 'web development, programming',
    description: 'Get the latest news in web dev',
};
