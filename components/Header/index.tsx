import styled from '@emotion/styled';
import { Box, Flex, FlexProps, Menu } from '@mantine/core';
import { useState } from 'react';
import { IconUserCircle, IconMessage, IconSettings, IconPower } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import IconUser from '../IconComponents/IconUser';
import IconArrowDown from '../IconComponents/IconArrowDown';
import IconHamburger from '../IconComponents/IconHamburger';

const HeaderContainer = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 38px;
  border-bottom: 1px solid #ededed;
  background-color: #ffff;
  column-gap: 22px;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  @media (max-width: 768px) {
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
  }
`;
const HamburgerContainer = styled(Flex)<FlexProps>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const lang: string[] = ['En'];

export default function Header({ toggleMobile }: { toggleMobile: () => void }) {
  const [selectedLang, setSelectedLang] = useState<string>('En');
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('loggedin');
    router.push('/');
  };
  return (
    <HeaderContainer>
      <HamburgerContainer align="center" onClick={toggleMobile}>
        <IconHamburger />
      </HamburgerContainer>
      <Flex align="center" columnGap={22}>
        <Menu width={200} position="bottom-end">
          <Menu.Target>
            <Flex align="center" columnGap={12} style={{ cursor: 'pointer' }}>
              <IconUser />
              <IconArrowDown />
            </Flex>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUserCircle />} style={{ fontFamily: 'Nunito' }}>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconMessage />} style={{ fontFamily: 'Nunito' }}>
              Messages
            </Menu.Item>

            <Menu.Item leftSection={<IconSettings />} style={{ fontFamily: 'Nunito' }}>
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={<IconPower />}
              style={{ fontFamily: 'Nunito' }}
              color="red.7"
              onClick={handleLogout}
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu width={50} position="bottom-end">
          <Menu.Target>
            <Flex align="center" columnGap={10} style={{ cursor: 'pointer' }}>
              <Box fw={600} fz={14} lh="22px" fs="normal" style={{ fontFamily: 'Nunito' }}>
                {selectedLang}
              </Box>
              <IconArrowDown />
            </Flex>
          </Menu.Target>
          <Menu.Dropdown>
            {lang.map((value) => (
              <Menu.Item
                key={value}
                onClick={() => setSelectedLang(value)}
                style={{ fontFamily: 'Nunito' }}
              >
                {value}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </HeaderContainer>
  );
}
