import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                    <meta name="description" content="O Pausecoding é um App que utiliza a técnica de pomodoro, com o objetivo de melhorar sua produtividade e foco. Desenvolvido durante a Next Level Week #4 da Rocketseat." />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="pausecoding" />
                    <meta property="og:description" content="O Move.it é um App que utiliza a técnica de pomodoro, com o objetivo de melhorar sua produtividade e foco. Desenvolvido durante a Next Level Week #4 da Rocketseat." />
                    <meta property="og:site_name" content="pausecoding" />
                    <link rel="icon" href="logo-full.svg" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}
