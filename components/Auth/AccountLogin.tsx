import {
  Grid,
  TextInput,
  Image,
  rem,
  Text,
  ScrollArea,
  Stack,
  Button,
  Flex,
  Anchor,
  Box,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { appColors } from '../SharedComponents/Color';
import HermoneyLogo from '../IconComponents/QTQuizLogo';
import HeadTitle from '../HeaderTitle';
import { ResponseAlertIndicatorModal, Wrapper } from '@/styles';
import IconClose from '../IconComponents/IconClose';
import IconLady from '../IconComponents/IconLady';
import IconPointer from '../IconComponents/IconPointer';
import { useApiServicesAppEmailTokenMutation } from '../state/services/getTokenApi';

const registrationSchema = z.object({
  userEmail: z.string().min(1, { message: 'Please enter address' }),
});
type RegistrationSchema = z.infer<typeof registrationSchema>;
const AccountLogin = () => {
  const defaultValues = {
    userEmail: '',
  };
  const { control, handleSubmit, formState } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
    defaultValues,
  });
  const [openModal, setModalClose] = useState(false);
  const { errors } = formState;
  const router = useRouter();
  const [register, { isSuccess, isError, isLoading, data: responseData }] =
    useApiServicesAppEmailTokenMutation();
  const errorState = 'An error occured. Try again!';
  const handleRegister = async (data: RegistrationSchema) => {
    await register({
      email: data.userEmail,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setModalClose(true);
      Cookies.set('loggedin', `${responseData?.token}`, { expires: 90 });
    }
    if (isError) {
      toast.error(`${errorState as string}`, {
        position: 'top-center',
      });
    }
  }, [isSuccess, isError]);
  return (
    <Box>
      <HeadTitle title="Login" />
      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <ScrollArea h="100vh" bg={appColors.white}>
            <Box
              px={{ base: rem(24), md: rem(67) }}
              mt={{ base: rem(28), md: rem(38) }}
              mb={{ base: rem(67), md: rem(119) }}
            >
              <Anchor href="/">
                <HermoneyLogo width={169} h={154} />
              </Anchor>
            </Box>

            <Box
              pl={{ base: rem(35), sm: rem(64), md: rem(67), lg: rem(162) }}
              pr={{ base: rem(50), sm: rem(77), md: rem(67), lg: rem(162) }}
              pos="relative"
            >
              <Box
                pos="absolute"
                right={{ base: rem(50), sm: rem(77), md: rem(67), lg: rem(162) }}
                top={rem(-40)}
              >
                <IconPointer />
              </Box>
              <Stack gap={2} mb={rem(32)}>
                <Text fz={{ base: rem(24), md: rem(28) }} fw={800} c={appColors.greenAccent}>
                  Get a token
                </Text>
                <Text fz={rem(16)} fw={400} c={appColors.textGray}>
                  Enter your email address to access your account
                </Text>
              </Stack>
              <form onSubmit={handleSubmit((data) => handleRegister(data))}>
                <Stack gap={24} mb={rem(24)}>
                  <Controller
                    name="userEmail"
                    render={({ field }) => (
                      <TextInput
                        label="Email address"
                        {...field}
                        placeholder="Enter Email address"
                        error={errors.userEmail?.message}
                      />
                    )}
                    control={control}
                  />
                </Stack>

                <Button
                  type="submit"
                  loading={isLoading}
                  style={{ borderRadius: 1000 }}
                  fullWidth
                  mb={40}
                >
                  Get Token
                </Button>
              </form>
            </Box>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 5 }}
          display={{ base: 'none', md: 'block' }}
          h="100vh"
          pos="fixed"
          right={0}
        >
          <ScrollArea h="100vh" bg={appColors.greenAccent}>
            <Box pt={rem(135)} px={rem(43)} pb={rem(147)}>
              <Text
                fw={900}
                fz={rem(32)}
                ta="center"
                style={{ color: appColors.white }}
                lh="42px"
                mb={rem(78)}
              >
                Welcome Back!
              </Text>
              <Image style={{ borderRadius: 10 }} src="/Image/quiz.svg" loading="lazy" />
            </Box>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <ToastContainer />;
      <ResponseAlertIndicatorModal
        opened={openModal}
        onClose={() => setModalClose(false)}
        centered
        withCloseButton={false}
        title={
          <Flex justify="space-between" align="center" w="100%">
            <Box style={{ visibility: 'hidden' }}>Title</Box>
            <IconClose onclick={() => setModalClose(false)} />
          </Flex>
        }
        transitionProps={{
          transition: 'fade',
          duration: 500,
          timingFunction: 'linear',
        }}
      >
        <Wrapper>
          <Flex direction="column" align="center">
            <IconLady />
            <Text mt={rem(20)} fw={700} fz={rem(18)} c={appColors.darkText}>
              Congratulation!
            </Text>
            <Text
              fw={400}
              fz={rem(14)}
              px={16}
              ta="center"
              c={appColors.darkGray}
              mb={rem(32)}
              mt={rem(8)}
            >
              We are thrilled to inform you that your token has been successfully received, granting
              you access to explore the next exciting part of our application - the dashboard!
            </Text>
            <Button style={{ borderRadius: 1000 }} onClick={() => router.push('/dashboard')}>
              Proceed
            </Button>
          </Flex>
        </Wrapper>
      </ResponseAlertIndicatorModal>
    </Box>
  );
};

export default AccountLogin;
