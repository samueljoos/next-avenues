import React from 'react';
import App, { Container } from 'next/app';
import routes from '../routes';
import Nav from '../components/nav';
import Head from 'next/head';


export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const route = routes.getCurrentRoute();
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx, route);
        }

        return { pageProps, route };
    }

    render() {
        const { Component, pageProps, route } = this.props;
        return (
            <Container>
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: `
                        body {
                            margin: 0;
                            padding: 20px;
                        }

                        nav {
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #ccc;
                            padding: 20px;
                            margin-left: -20px;
                            margin-right: -20px;
                        }

                        ul {
                            display: flex;
                            margin: 0;
                            padding: 0;
                            list-style: none;
                        }

                        li > a {
                            padding: 5px;
                            display: block;
                        }
                    ` }} />

                </Head>
                <Nav route={route} />
                { pageProps.route && <LanguageSwitcher /> }
                <Component {...pageProps} route={route} />
            </Container>
        );
    }
}
