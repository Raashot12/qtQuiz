import styled from '@emotion/styled';
import { Box, Button, Group, Stack, Text, Flex, FlexProps } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import IconDashboard from '../IconComponents/IconDashboard';
import IconBalance from '../IconComponents/IconBalance';
import IconTransaction from '../IconComponents/IconTransaction';
import IconQuestion from '../IconComponents/IconQuestion';
import IconBack from '../IconComponents/IconBack';
import IconQuestionMark from '../IconComponents/IconQuestionMark';
import IconExpand from '../IconComponents/IconExpand';
import IconHamburger from '../IconComponents/IconHamburger';
import QTQuizLogo from '../IconComponents/QTQuizLogo';

type SidebarProps = {
  isOpened: boolean;
  handleToggle: () => void;
  toggleMobile: () => void;
  mobileShow: boolean;
};
type SidebarContainerProps = {
  isOpened: boolean;
  mobileShow: boolean;
};
export const SidebarContainer = styled.aside<SidebarContainerProps>`
  background: #fffbf7;
  width: 280px;
  transition: width 0.5s;
  overflow: hidden;
  text-align: left;
  padding-left: 48px;
  padding-top: 30px;
  height: 100vh;
  z-index: 999;
  flex-shrink: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  position: fixed;
  ${({ isOpened }) =>
    isOpened &&
    `width: 100px;
    padding-left: 30px;
    .text-label{
      display: none;
    }
   @media (max-width: 768px) {
    width: 0px;
    padding: 0px;
  }
  }
  `}
  @media (max-width: 768px) {
    width: 0px;
    transition: width 0.2s;
    padding-left: 0px !important;
    ${({ mobileShow }) =>
      mobileShow &&
      `width: 280px!important;
      display: flex;
      padding-left: 32px !important;
      padding-top: 15px;
      transition: width 0.2s;

  }
  `}
  }
`;
const ButtonContainer = styled(Box as any)`
  @media (max-width: 768px) {
    display: none;
  }
`;
const OverFlowBox = styled(Box as any)`
  ::-webkit-scrollbar {
    width: 7px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #a5aaad;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0a0a0a;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ef2c5a;
  }
`;
const GroupContainer = styled(Group)`
  &.hovering-state:hover {
    color: #00cc5b;
    .text-label {
      font-weight: 600;
    }
  }
  & .active {
    color: #00cc5b;
    font-weight: 600;
  }
`;
const HamburgerContainer = styled(Flex)<FlexProps>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const LogoContainer = styled(Box as any)`
  display: none;
  @media (min-width: 768.1px) {
    display: block;
  }
`;

export default function Sidebar({
  isOpened,
  handleToggle,
  mobileShow,
  toggleMobile,
}: SidebarProps) {
  const [itemHovered, setItemHovered] = useState<string | null>(null);

  const handleMouseHover = (param: string | null) => {
    setItemHovered(param);
  };

  const handleMouseOut = () => {
    setItemHovered(null);
  };
  const router = useRouter();
  return (
    <SidebarContainer isOpened={isOpened} mobileShow={mobileShow}>
      <LogoContainer sx={{ flexShrink: 0 }}>
        <QTQuizLogo width={50} h={60} />
      </LogoContainer>
      <HamburgerContainer onClick={toggleMobile}>
        <IconHamburger />
      </HamburgerContainer>
      <OverFlowBox mt={53} sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <Box>
          <Text color="#8D8D8D" fw={500} style={{ fontFamily: 'Nunito' }} className="text-label">
            Main pages
          </Text>
          <Stack gap={18} mt={16} color="#0A0A0A">
            <GroupContainer
              gap={8}
              style={{ cursor: 'pointer' }}
              align="center"
              className="hovering-state"
              onMouseOver={() => handleMouseHover('Dashboard')}
              onMouseOut={handleMouseOut}
              onClick={() => router.push('/dashboard')}
            >
              <IconDashboard
                active={itemHovered === 'Dashboard' || router.pathname === '/dashboard'}
              />
              <Text
                fw={400}
                style={{ fontFamily: 'Nunito' }}
                className={
                  router.pathname === '/dashboard' ? 'active text-label' : 'text-label not-active'
                }
              >
                Questions
              </Text>
            </GroupContainer>
            <GroupContainer
              gap={8}
              style={{ cursor: 'pointer' }}
              align="center"
              className="hovering-state"
              onMouseOver={() => handleMouseHover('Balances')}
              onMouseOut={handleMouseOut}
              onClick={() => router.push('/dashboard/create-question')}
            >
              <IconBalance
                active={
                  itemHovered === 'Balances' || router.pathname === '/dashboard/create-question'
                }
              />
              <Text
                fw={400}
                style={{ fontFamily: 'Nunito' }}
                className={
                  router.pathname === '/dashboard/create-question'
                    ? 'active text-label'
                    : 'text-label not-active'
                }
              >
                Create Question
              </Text>
            </GroupContainer>
            <GroupContainer
              gap={12}
              style={{ cursor: 'pointer' }}
              align="center"
              className="hovering-state"
              onMouseOver={() => handleMouseHover('Transactions')}
              onMouseOut={handleMouseOut}
              onClick={() => router.push('/dashboard/question-manager')}
            >
              <IconTransaction
                active={
                  itemHovered === 'Transactions' ||
                  router.pathname === '/dashboard/question-manager'
                }
              />
              <Text
                fw={400}
                style={{ fontFamily: 'Nunito' }}
                className={
                  router.pathname === '/dashboard/question-manager'
                    ? 'active text-label'
                    : 'text-label not-active'
                }
              >
                Manage Question
              </Text>
            </GroupContainer>
          </Stack>
        </Box>
      </OverFlowBox>
      <Stack mt={35}>
        {isOpened ? (
          <Flex
            style={{ borderRadius: '50%' }}
            bg="#00CC5B"
            w="48px"
            h="48px"
            align="center"
            justify="center"
          >
            <IconQuestionMark />
          </Flex>
        ) : (
          <Button
            leftSection={<IconQuestion />}
            mih={40}
            w="120px"
            style={{
              borderRadius: '39px',
              backgroundColor: '#00CC5B',
              '& .mantine-Button-label': {
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'Nunito',
                lineHeight: '15.6px',
                fontStyle: 'normal',
              },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Support
          </Button>
        )}
        <ButtonContainer>
          {isOpened ? (
            <Flex
              style={{
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              bg="#00CC5B"
              w="48px"
              h="48px"
              align="center"
              justify="center"
              onClick={handleToggle}
            >
              <IconExpand />
            </Flex>
          ) : (
            <Button leftSection={<IconBack />} onClick={handleToggle}>
              Hide panel
            </Button>
          )}
        </ButtonContainer>
      </Stack>
    </SidebarContainer>
  );
}
