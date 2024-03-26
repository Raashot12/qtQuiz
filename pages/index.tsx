import { Anchor, Center, Group, Stack } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { appColors } from '@/components/SharedComponents/Color';
import QTQuizLogo from '@/components/IconComponents/QTQuizLogo';

export default function Home() {
  return (
    <div>
      <Head>
        <title>QT QUIZ</title>
        <meta name="description" content="QT Web Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center
        style={{
          backgroundColor: appColors.grayBackground,
          minHeight: '100vh',
        }}
      >
        <Stack>
          <div>
            <QTQuizLogo width={229} h={215} />
          </div>
          <div style={{ margin: 'auto' }}>
            <Group>
              <Link href="/auth/login" passHref>
                <Anchor size="lg" c="brand.5" component="p">
                  Register
                </Anchor>
              </Link>
            </Group>
          </div>
        </Stack>
      </Center>
    </div>
  );
}
