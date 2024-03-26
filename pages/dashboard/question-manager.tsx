import { Box } from '@mantine/core';
import React from 'react';
import QTQuizLayoutWrapper from '@/components/layouts/QTQuizLayoutWrapper';
import QuestionManager from '@/components/Dashboard/QuestionManager';

const QuestionManagerPage = () => (
  <QTQuizLayoutWrapper>
    <Box mt={100}>
      <QuestionManager />
    </Box>
  </QTQuizLayoutWrapper>
);

export default QuestionManagerPage;
