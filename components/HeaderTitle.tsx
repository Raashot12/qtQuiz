import Head from 'next/head';

type HeadTitleProps = {
  title: string;
};

const HeadTitle = ({ title }: HeadTitleProps) => (
  <Head>
    <title>QT Quiz|{title}</title>
  </Head>
);

export default HeadTitle;
