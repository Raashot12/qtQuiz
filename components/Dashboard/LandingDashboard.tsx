/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  ButtonProps,
  Center,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import styled from '@emotion/styled';
import { IconAlertCircle, IconArrowBack, IconArrowForward } from '@tabler/icons-react';
import { useApiServicesAppQuestionGetQuery } from '../state/services/questionsApi';

export type Questionnaire = {
  [key: string]: {
    question: string;
    options: string[];
  };
};

const FlexContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 16px;
  margin-bottom: 40px;
  background-color: #ffff;
  box-sizing: border-box;
`;
const ButtonCustom = styled(Button)<ButtonProps>`
  .mantine-Button-label {
    font-size: 14px !important;
    font-family: 'Nunito';
  }
`;

const QuestionContainer = styled.div`
  flex: none;
  width: 100%; /* Adjust this width as needed */
  margin-right: 18px; /* Add some space between questions */
`;

const LandingDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionArray, setQuestionArray] = useState<
    {
      id: string;
      question: string;
      options: string[];
    }[]
  >();
  const { data, isError, isLoading } = useApiServicesAppQuestionGetQuery({});
  const scroll = (index: number) => {
    if (ref.current) {
      ref.current.scrollLeft = index * (ref.current.clientWidth - 17);
    }
  };

  const handleNext = () => {
    const lengthOfQuestion = questionArray?.length as number;
    if (activeTestimonialIndex < lengthOfQuestion - 1) {
      setActiveTestimonialIndex((prevIndex) => prevIndex + 1);
      scroll(activeTestimonialIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTestimonialIndex > 0) {
      setActiveTestimonialIndex((prevIndex) => prevIndex - 1);
      scroll(activeTestimonialIndex - 1);
    }
  };
  const handleOptionSelect = (index: number, optionIndex: number) => {
    const newAnswers = [...answers];
    const questionArrayNew = [
      ...(questionArray as {
        id: string;
        question: string;
        options: string[];
      }[]),
    ];
    newAnswers[index] = questionArrayNew[index].options[optionIndex];
    setAnswers(newAnswers);
  };
  useEffect(() => {
    if (!isLoading && !isError) {
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
      setAnswers(Array(questionnaireArray.length).fill(''));
    }
  }, [isLoading, isError]);
  const displayTestimonialImages = () => (
    <>
      {questionArray && questionArray?.length <= 0 ? (
        <Box fw={600} fz={18} ta="center">
          No question at moment. Please create one
        </Box>
      ) : (
        questionArray?.map((value, index) => (
          <Question
            key={index}
            index={index}
            data={value}
            onSelect={handleOptionSelect}
            selectedOption={answers[index]}
          />
        ))
      )}
    </>
  );

  return (
    <Box style={{ marginTop: 100 }}>
      {isLoading ? (
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
        <Box style={{ maxWidth: 1180, margin: '0 auto' }} w={{ base: '100%', md: '80%' }}>
          <FlexContainer ref={ref}>{displayTestimonialImages()}</FlexContainer>
          <Group gap={20} display={questionArray && questionArray?.length <= 0 ? 'none' : 'flex'}>
            <Box onClick={handlePrevious}>
              <ButtonCustom h={54} fw={800} w={140} leftSection={<IconArrowBack />}>
                PREVIOUS
              </ButtonCustom>
            </Box>
            <Box onClick={handleNext}>
              <ButtonCustom fz={24} fw={800} h={54} w={140} rightSection={<IconArrowForward />}>
                NEXT
              </ButtonCustom>{' '}
            </Box>
          </Group>
        </Box>
      )}
    </Box>
  );
};

export default LandingDashboard;
const Alphabet = ['A', 'B', 'C', 'D'];
const Question = ({
  data,
  index,
  onSelect,
  selectedOption,
}: {
  data: {
    id: string;
    question: string;
    options: string[];
  };
  index: number;
  onSelect: (index: number, optionIndex: number) => void;
  selectedOption: string;
}) => (
  <QuestionContainer>
    <Text fw={800} fz={{ base: 30, md: 54 }} c="#00CC5B">
      {data.question}?
    </Text>
    <Stack gap={16} mt={20}>
      {data.options.map((value, optionIndex) => (
        <Box key={optionIndex} onClick={() => onSelect(index, optionIndex)}>
          <Group style={{ cursor: 'pointer' }}>
            <Flex
              w={54}
              h={54}
              align="center"
              c={selectedOption === value ? '#ffff' : '#101828'}
              bg={selectedOption === value ? '#00CC5B' : '#CCCCCC'}
              justify="center"
              style={{ borderRadius: 10 }}
            >
              <Text fw={800} fz={{ base: 18, md: 32 }}>
                {Alphabet[optionIndex]}
              </Text>
            </Flex>
            <Flex
              w={{ base: '75%', md: '50%' }}
              h={54}
              align="center"
              bg={selectedOption === value ? '#00CC5B' : '#CCCCCC'}
              justify="flex-start"
              style={{ borderRadius: 10 }}
              px={20}
              pos="relative"
            >
              <Text
                fw={800}
                fz={{ base: 18, md: 32 }}
                c={selectedOption === value ? '#ffff' : '#101828'}
              >
                {value}
              </Text>
              <input
                style={{
                  width: '100%',
                  height: '54px',
                  position: 'absolute',
                  visibility: 'hidden',
                  left: 10,
                }}
                type="radio"
                name={`question-${data.id}`}
                checked={selectedOption === value}
              />
            </Flex>
          </Group>
        </Box>
      ))}
    </Stack>
  </QuestionContainer>
);
