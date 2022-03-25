import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    public render() {
        return <Html>
            <Head/>
            <body>
            <Main/>
            <div id="spinner"/>
            <div id="modals"/>
            <div id="navbar"/>
            <div id="status-modal"/>
            <NextScript/>
            </body>
        </Html>;
    }
}
