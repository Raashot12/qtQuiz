import styled from '@emotion/styled';
import { Flex, FlexProps, Modal } from '@mantine/core';
import { appColors } from '@/components/SharedComponents/Color';

export const ResponseAlertIndicatorModal = styled(Modal)`
  .mantine-Modal-header {
    display: block;
    padding-bottom: 0px;
    min-height: 3rem;
  }
  .mantine-Paper-root {
    border-radius: 12px;
  }
  .mantine-Modal-body {
    background: ${appColors.white};
  }
`;

export const Wrapper = styled(Flex)<FlexProps>`
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;
