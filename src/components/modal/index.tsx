import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import theme, { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  open: boolean;
  footer?: ReactNode;
  onClose: () => void;
};

export default function ModalCustomization({ children, title = "Modal Title", open, footer, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <StyledModalContent>
        <StyledModalHead>
          <StyledModalTitle id="modal-modal-title" variant="h6">
            {title}
          </StyledModalTitle>
        </StyledModalHead>
        <StyledModalBody>{children}</StyledModalBody>
        <StyledModalFooter>
          {footer ? (
            footer
          ) : (
            <>
              <StyledSecondaryButton onClick={() => onClose()}>Cancel</StyledSecondaryButton>
              <StyledPrimaryButton>Submit</StyledPrimaryButton>
            </>
          )}
        </StyledModalFooter>
      </StyledModalContent>
    </Modal>
  );
}

// Styled
const StyledModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border-radius: 8px;
  border: 1.5px solid gray;
  padding: 16px 24px 32px;

  display: flex;
  flex-direction: column;
  max-height: calc(100% - 48px);
  height: auto;

  width: calc(100% - 32px);

  ${({ theme }) => `
    @media only screen and (min-width: 768px) {
      width: unset;
      min-width: 460px;
      max-width: calc(100% - 64px);
    }
  `}
`;
const StyledModalHead = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const StyledModalTitle = styled(Typography)`
  font-size: 24px;
  line-height: 133.4%;
`;

const StyledModalBody = styled(Box)``;

const StyledModalFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 16px;

  padding-top: 12px;
`;
