import React, { useEffect, useState } from 'react';
import { Alert, Box, Center, Flex, Grid, Group, Loader, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconEdit } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import {
  useApiServicesAppQuestionDeleteMutation,
  useApiServicesAppQuestionGetQuery,
} from '../state/services/questionsApi';
import { Questionnaire } from './LandingDashboard';
import { appColors } from '../SharedComponents/Color';
import IconDelete from '../IconComponents/IconDelete';
import ConfirmationAlertDialog from '../Shared/ConfirmationAlertDialog';

const Alphabet = ['A', 'B', 'C', 'D'];
const QuestionManager = () => {
  const { data, isError, isFetching, refetch } = useApiServicesAppQuestionGetQuery({});
  const [idToDelete, setIdToDelete] = useState('');
  const [triggerDelete, { isSuccess, isLoading, isError: DeleteError }] =
    useApiServicesAppQuestionDeleteMutation();
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState<boolean>(false);
  const [questionArray, setQuestionArray] = useState<
    {
      id: string;
      question: string;
      options: string[];
    }[]
  >();

  const onDelete = async (id: string) => {
    await triggerDelete({
      id,
    });
  };
  useEffect(() => {
    if (!isFetching && !isError) {
      const questionnaireArray = Object.entries(data as Questionnaire).map(
        ([id, { question, options }]) => ({
          id,
          question,
          options,
        })
      ) as {
        id: string;
        question: string;
        options: string[];
      }[];
      setQuestionArray(questionnaireArray);
    }
  }, [isFetching, isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success('Question delete successfully', {
        position: 'top-left',
      });
      setOpenedConfirmDialog(false);
      refetch();
    }
    if (DeleteError) {
      toast.error('An unexpected error occured', {
        position: 'top-left',
      });
    }
  }, [isSuccess]);

  return (
    <>
      {isFetching ? (
        <Center>
          <Loader color="#00CC5B" />
        </Center>
      ) : isError ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error"
          color="red.6"
          variant="outline"
          withCloseButton
        >
          Error Fetching payment data
        </Alert>
      ) : (
        <>
          {questionArray && questionArray?.length <= 0 ? (
            <Box fw={600} fz={18} ta="center">
              No question to manage. Please create one
            </Box>
          ) : (
            <Grid gutter={10}>
              {questionArray?.map((value, index) => (
                <Grid.Col
                  key={index}
                  span={{ base: 12, md: 4 }}
                  style={{
                    border: `2px dotted ${appColors.greenAccent}`,
                  }}
                >
                  <Flex mt={20} align="center" justify="space-between" px={10}>
                    <Text fz={24} fw={800}>
                      {value.question}
                    </Text>
                    <Group>
                      <IconEdit cursor="pointer" />
                      <IconDelete
                        onclick={() => {
                          setOpenedConfirmDialog(true);
                          setIdToDelete(value.id);
                        }}
                      />
                    </Group>
                  </Flex>
                  <Text
                    style={{ textDecoration: 'underline', paddingLeft: 10, paddingRight: 10 }}
                    fz={18}
                    mt={16}
                    fw={700}
                  >
                    Options:
                  </Text>
                  <Stack
                    gap={10}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {value.options.map((text, i) => (
                      <React.Fragment key={i}>
                        <Text fw={500} fz={18}>
                          {Alphabet[i]}: &nbsp;
                          {text}
                        </Text>
                      </React.Fragment>
                    ))}
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </>
      )}
      <ConfirmationAlertDialog
        title="Delete question"
        content="Are you sure you want to delete this quiz question?"
        open={openedConfirmDialog}
        close={setOpenedConfirmDialog}
        setIdToDelete={setIdToDelete}
        isloading={isLoading}
        handleProceed={() => onDelete(idToDelete)}
      />
      <ToastContainer />
    </>
  );
};

export default QuestionManager;
