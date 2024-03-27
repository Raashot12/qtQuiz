import { Button, Flex, FlexProps, Modal, Text } from '@mantine/core';
import styled from '@emotion/styled';
import { appColors } from '../SharedComponents/Color';
import IconConfirmDialog from '../IconComponents/IconConfirmDialog';

export type ConfirmationDialogProps = {
  title?: string | undefined;
  content?: string | undefined;
  open: boolean;
  isloading?: boolean;
  close: (args: boolean) => void;
  handleProceed: () => void;
  setIdToDelete?: (arg: string) => void;
};

const ConfirmationModal = styled(Modal)`
  .mantine-Modal-header {
    background: ${appColors.pageBackground};
    min-height: 3.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mantine-Modal-title {
    width: 100%;
  }

  .mantine-Modal-body {
    background-color: ${appColors.pageBackground};
    height: 100%;
  }

  .mantine-Modal-content {
    background-color: ${appColors.pageBackground};
  }

  .mantine-Modal-close {
    margin-left: 1rem;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background: ${appColors.halfFade};
    color: ${appColors.blue};
  }
`;

const ConfirmationContents = styled.div`
  background-color: ${appColors.white};
  height: fit-content;
  border-radius: 0.625rem;
  margin-bottom: 1.2rem;
  .mantine-Stack-root {
    gap: 0.5rem;
  }
`;

export const ConfirmationButtonsWrapper = styled(Flex)<FlexProps>`
  width: 100%;
  justify-content: end;
  align-items: end;
  gap: 20px;
  position: sticky;
  bottom: 0px;
  flex: 1;
`;

const ConfirmationAlertDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  open,
  isloading,
  close,
  handleProceed,
  setIdToDelete,
}) => (
  <ConfirmationModal
    opened={open}
    onClose={() => close(false)}
    withCloseButton={false}
    centered
    size="30rem"
  >
    <Flex align="center" justify="space-between" mb="1rem">
      <Text fw={600}>{title}</Text>
      <IconConfirmDialog />
    </Flex>
    <ConfirmationContents>
      <Text p="1rem" color={appColors.black} fw="500" lh="1.25rem">
        {content}
      </Text>
    </ConfirmationContents>
    <ConfirmationButtonsWrapper>
      <Button
        style={{
          height: '2rem',
          color: appColors.black,
          background: appColors.white,
          ':hover': {
            background: appColors.white,
          },
        }}
        onClick={() => {
          setIdToDelete?.('');
          close(false);
        }}
      >
        Cancel
      </Button>
      <Button
        size="xs"
        style={{
          height: '2rem',
          color: appColors.white,
          background: appColors.greenAccent,
          ':hover': {
            background: appColors.greenAccent,
          },
          label: {
            fontSize: '0.85rem',
          },
        }}
        onClick={() => handleProceed()}
        loading={isloading}
      >
        Proceed
      </Button>
    </ConfirmationButtonsWrapper>
  </ConfirmationModal>
);

export default ConfirmationAlertDialog;
