import React, { useEffect, useState } from 'react';
import { Text, Box, Flex, Grid, TextInput, Button, Stack } from '@mantine/core';
import styled from '@emotion/styled';
import { IconPlus } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import { useApiServicesAppQuestionPostMutation } from '../state/services/questionsApi';
import { appColors } from '../SharedComponents/Color';

export const TextArea = styled(TextInput)`
  .mantine-TextInput-input {
    height: 80px !important;
    border-radius: 10px !important;
  }
`;
const Alphabet = ['1', '2', '3'];
const CreateQuestion = () => {
  const [registerNewQuestion, { isSuccess, isError, isLoading }] =
    useApiServicesAppQuestionPostMutation();
  const [options, setOptions] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [optionSelect, setOptionSelect] = useState<string>('');

  const handleAddQuestion = (value: string) => {
    if (!optionSelect) {
      toast.warn('Option field cannot be empty !', {
        position: 'top-left',
      });
      return;
    }
    if (options.length >= 3) {
      toast.error('Options cannot be more than three', {
        position: 'top-left',
      });
      return;
    }
    if (optionSelect) {
      setOptions((prev) => [...prev, value]);
      setOptionSelect('');
      toast.success('An option has been added!', {
        position: 'top-left',
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!question) {
      toast.warn('Question cannot be empty', {
        position: 'top-left',
      });
      return;
    }
    if (options.length < 3) {
      toast.warn('Options cannot be less than three', {
        position: 'top-left',
      });
      return;
    }
    await registerNewQuestion({
      createQuiz: {
        question,
        options,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Question created successfully', {
        position: 'top-left',
      });
      setQuestion('');
      setOptions([]);
    }
    if (isError) {
      toast.error('An unexpected error occured', {
        position: 'top-left',
      });
    }
  }, [isSuccess]);
  return (
    <Box component="form" mt={100}>
      <Grid>
        <Grid.Col>
          <TextArea
            required
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
        </Grid.Col>
        <Grid.Col mt={20}>
          <TextInput
            label="Add Option"
            type="text"
            placeholder="Enter option type here"
            value={optionSelect}
            onChange={(e) => setOptionSelect(e.target.value)}
            rightSection={
              <Flex
                w={30}
                h={30}
                align="center"
                justify="center"
                bg={appColors.greenAccent}
                style={{ borderRadius: 5, cursor: 'pointer' }}
                onClick={() => handleAddQuestion(optionSelect as string)}
              >
                <IconPlus color={appColors.white} />
              </Flex>
            }
          />
        </Grid.Col>
      </Grid>
      <Button type="submit" mt={20} loading={isLoading} onClick={handleSubmit}>
        Submit Question
      </Button>
      <Box mt={40}>
        <Text fw={600} fz={28}>
          Question Build up
        </Text>
        <Text mt={20} fz={24} fw={800}>
          Question: {!question ? '-----' : question}
        </Text>
        <Text style={{ textDecoration: 'underline' }} fz={18} mt={20} fw={700}>
          Options:
        </Text>
        <Stack gap={10}>
          {options.map((value, index) => (
            <React.Fragment key={index}>
              <Text fw={500} fz={18}>
                {Alphabet[index]}: &nbsp;
                {value}
              </Text>
            </React.Fragment>
          ))}
        </Stack>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CreateQuestion;
