import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mantine/core';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: hidden;
`;

const Content = styled.div<{ isOpened: boolean; mobileShow: boolean }>`
  flex: 1;
  width: 100%;
  text-align: left;
  position: relative;
  margin-left: ${({ isOpened }) => (isOpened ? '90px' : '280px')};
  overflow-x: hidden;
  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const PageContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  flex: 1;
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const QTQuizLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isOpened, setOpened] = useState(false);
  const [mobileShow, setMobile] = useState(false);
  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };
  const toggleMobile = () => {
    setMobile((prev) => !prev);
  };
  return (
    <Container>
      <Box style={{ display: 'flex' }}>
        <Sidebar
          isOpened={isOpened}
          handleToggle={toggleDrawer}
          mobileShow={mobileShow}
          toggleMobile={toggleMobile}
        />
        <Header toggleMobile={toggleMobile} />
        <Content isOpened={isOpened} mobileShow={mobileShow}>
          <PageContainer>{children}</PageContainer>
        </Content>
      </Box>
    </Container>
  );
};

export default QTQuizLayoutWrapper;
