import { StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import theme from "@/theme/theme";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export default function ModalCustomization({ children, width = 460, title = "Modal Title", open, footer, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <StyledModalContent width={width}>
        <StyledModalHead>
          <StyledModalTitle id="modal-modal-title" variant="h6" component="h2">
            {title}
          </StyledModalTitle>
        </StyledModalHead>
        <StyledModalBody>{children}</StyledModalBody>
        <StyledModalFooter>
          {footer ? (
            footer
          ) : (
            <>
              <StyledSecondaryButton textColor={theme.colors.blue219} onClick={() => onClose()}>
                Cancel
              </StyledSecondaryButton>
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
  border-radius: 12px;
  border: 1.5px solid gray;
  padding: 16px 24px 32px;

  display: flex;
  flex-direction: column;
  max-height: calc(100% - 48px);
  height: auto;
`;
const StyledModalHead = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  margin-bottom: 24px;
`;
const StyledModalTitle = styled(Typography)`
  font-size: 24px;
  line-height: 133.4%;
`;
const StyledModalDescription = styled(Typography)`
  color: black;
  font-size: 14px;
  line-height: 123.5%;
  letter-spacing: 0.25px;
  margin: 8px 0;
`;
const StyledModalBody = styled(Box)`
  / overflow-y: auto; /
  margin-right: -24px;
  padding-right: 24px;
  padding-top: 10px;
`;

const StyledModalFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 16px;

  padding-top: 40px;
`;
