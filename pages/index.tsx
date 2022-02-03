/*
Don't forget to modify the Head component with your website informations
You can also update the content on the Landing.js component
*/

import Head from 'next/head';
import Landing from 'components/Landing';
import Layout from 'components/Layout';

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>{`Welcome to ${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      } 👋`}</title>
      <meta
        name="description"
        content="Not Another To Do is a way to learn new languages without having to do another to do app. "
      />

      <meta property="og:url" content="/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`Welcome to ${
          process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
        } 👋`}
      />
      <meta
        property="og:description"
        content="Not Another To Do is a way to learn new languages without having to do another to do app. "
      />
      <meta property="og:image" content="" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="" />
      <meta property="twitter:url" content="" />
      <meta
        name="twitter:title"
        content={`Welcome to ${
          process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
        } 👋`}
      />
      <meta
        name="twitter:description"
        content="Not Another To Do is a way to learn new languages without having to do another to do app. "
      />
      <meta name="twitter:image" content="" />
      <meta charSet="UTF-8" />
    </Head>

    <Layout>
      <Landing />
    </Layout>
  </>
);
export default Home;
