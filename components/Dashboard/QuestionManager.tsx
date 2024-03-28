import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Center,
  createTheme,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconAlertCircle, IconEdit } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { toast, ToastContainer } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import {
  useApiServicesAppQuestionDeleteMutation,
  useApiServicesAppQuestionEditMutation,
  useApiServicesAppQuestionGetQuery,
} from '../state/services/questionsApi';
import { Questionnaire } from './LandingDashboard';
import { appColors } from '../SharedComponents/Color';
import IconDelete from '../IconComponents/IconDelete';
import ConfirmationAlertDialog from '../Shared/ConfirmationAlertDialog';
import IconClose from '../IconComponents/IconClose';
import { TextArea } from './CreateQuestion';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});
export const AccountSettingsModal = styled(Modal)<{ colorMode?: string }>`
  & .mantine-Paper-root {
    background: ${({ colorMode }) => (colorMode ? `${colorMode}` : `${appColors.pageBackground}`)};
    @media (max-width: ${() => theme?.breakpoints?.md as string}) {
      width: 99%;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #85878b;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #85878b;
    }
  }
  & .mantine-Modal-title {
    width: 100%;
    margin-right: 4px;
  }
  & .mantine-Modal-header {
    background-color: ${appColors.pageBackground};
    padding: 1rem 32px;
  }
  & .mantine-Modal-body {
    padding: 0rem 32px;
    ::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #85878b;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #85878b;
    }
  }
`;
const Alphabet = ['A', 'B', 'C', 'D'];
const QuestionManager = () => {
  const { data, isError, isFetching, refetch } = useApiServicesAppQuestionGetQuery({});
  const [idToDelete, setIdToDelete] = useState('');
  const [triggerDelete, { isSuccess, isLoading, isError: DeleteError }] =
    useApiServicesAppQuestionDeleteMutation();
  const [triggerEdit, { isSuccess: editSuccess, isLoading: editIsLoading, isError: editError }] =
    useApiServicesAppQuestionEditMutation();
  const [questionEdit, setQuestionEdit] = useState<{
    id: string;
    question: string;
    options: string[];
  }>({
    id: '',
    question: '',
    options: [''],
  });
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const openAddDepartmentModal = () => open();
  const closeEditModal = () => close();
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
      if (data === null || data === undefined) {
        setQuestionArray([]);
        return;
      }
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
  }, [isSuccess, DeleteError]);

  useEffect(() => {
    if (editSuccess) {
      toast.success('Question updated successfully', {
        position: 'top-left',
      });
      closeEditModal();
      refetch();
    }
    if (editError) {
      toast.error('An unexpected error occured', {
        position: 'top-left',
      });
    }
  }, [editError, editSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!questionEdit) {
      toast.warn('Question cannot be empty', {
        position: 'top-left',
      });
      return;
    }
    const update = {
      question: questionEdit.question,
      options: questionEdit.options,
    };
    await triggerEdit({
      editQuiz: update,
      id: idToDelete,
    });
  };

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
                    <Group wrap="nowrap">
                      <IconEdit
                        cursor="pointer"
                        onClick={() => {
                          openAddDepartmentModal();
                          setIdToDelete(value.id);
                          setQuestionEdit(
                            value as {
                              id: string;
                              question: string;
                              options: string[];
                            }
                          );
                        }}
                      />
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
      <AccountSettingsModal
        opened={opened}
        onClose={closeEditModal}
        withCloseButton={false}
        size="90%"
        centered
        title={
          <Flex justify="space-between" align="center">
            <Stack gap={0}>
              <Text fz={18} fw={600}>
                Edit Quiz Question
              </Text>
              <Text c={appColors.text} fz={14} fw={500}>
                Edit question details below. Fields marked as asterisk are required
              </Text>
            </Stack>
            <IconClose size={24} onclick={closeEditModal} />
          </Flex>
        }
      >
        <Box component="form" pb={20}>
          <TextArea
            required
            label="Question"
            style={{ width: '100%' }}
            value={questionEdit.question}
            onChange={(e) => {
              setQuestionEdit((prevState) => ({
                ...prevState,
                question: e.target.value,
              }));
            }}
            placeholder="Enter your question"
          />
          <Flex mt={20} gap={16} wrap="wrap">
            {questionEdit.options.map((value, index) => (
              <TextInput
                key={index}
                label={`Add Option ${index + 1}`}
                type="text"
                placeholder="Enter option type here"
                value={value}
                onChange={(e) => {
                  setQuestionEdit((prevState) => {
                    const updatedOptions = [...prevState.options];
                    updatedOptions[index] = e.target.value;

                    return {
                      ...prevState,
                      options: updatedOptions,
                    };
                  });
                }}
              />
            ))}
          </Flex>
          <Button type="submit" mt={20} loading={editIsLoading} onClick={handleSubmit}>
            Update Question
          </Button>
        </Box>
      </AccountSettingsModal>
      <ToastContainer />
    </>
  );
};

export default QuestionManager;
