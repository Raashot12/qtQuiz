/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head';
import LandingDashboard from '@/components/Dashboard/LandingDashboard';
import QTQuizLayoutWrapper from '@/components/layouts/QTQuizLayoutWrapper';

function Home() {
  // const mobileScreen = useMediaQuery('(max-width: 576px)');

  return (
    <QTQuizLayoutWrapper>
      <Head>
        <title>QT QUIZ | Dashboard</title>
        <meta name="description" content="QT QUIZ dashboard" />
      </Head>
      <LandingDashboard />
    </QTQuizLayoutWrapper>
  );
}
export default Home;
