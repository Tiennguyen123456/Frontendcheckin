import { ACTION } from "@/constants/enum";
import { StyledPopover, StyledPrimaryButton, StyledSecondaryButton } from "@/styles/commons";
import theme, { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

type Props = {
  id: number;
  onConfirm: (value: any) => void;
  mainTitle: string;
  subtitle: string;
  icon: ReactNode;
  color?: string;
  buttonTitle?: string;
  disabled?: boolean;
};

export default function ConfirmPopover({
  id,
  onConfirm,
  mainTitle,
  subtitle,
  icon,
  color,
  buttonTitle,
  disabled,
}: Props) {
  const translation = useTranslations();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showConfirmPopover, setShowConfirmPopover] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const handleCloseConfirmPopover = () => {
    setAnchorEl(null);
    setShowConfirmPopover(false);
  };

  const handleShowConfirmPopover = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setShowConfirmPopover(true);
  };

  const handleConfirm = async () => {
    try {
      setLoadingConfirm(true);
      await onConfirm(id);
      setLoadingConfirm(false);
      handleCloseConfirmPopover();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <IconButton
        sx={{ color: color }}
        disabled={disabled}
        aria-label="delete"
        id="delete-popover"
        onClick={handleShowConfirmPopover}
      >
        {icon}
      </IconButton>
      <StyledPopover
        id={"delete-popover"}
        open={showConfirmPopover}
        anchorEl={anchorEl}
        onClose={handleCloseConfirmPopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledPopoverContent sx={{ padding: "16px" }}>
          <StyledPopoverTitle>{mainTitle}</StyledPopoverTitle>
          <StyledPopoverDescription>{subtitle}</StyledPopoverDescription>
          <StyledPopoverActions>
            <StyledCancelButton
              onClick={handleCloseConfirmPopover}
              sx={buttonTitle != null ? { color: themeColors.colors.gray5C6 } : { color: themeColors.colors.redD32 }}
            >
              {translation("action.cancel")}
            </StyledCancelButton>
            <StyledDeleteButton
              loading={loadingConfirm}
              loadingPosition="start"
              sx={{ backgroundColor: color != null ? color : themeColors.colors.redD32 }}
              onClick={handleConfirm}
            >
              {buttonTitle === ACTION.Approve ? translation("action.approve") : translation("action.delete")}
            </StyledDeleteButton>
          </StyledPopoverActions>
        </StyledPopoverContent>
      </StyledPopover>
    </>
  );
}

// Styled
const StyledPopoverContent = styled(Box)`
  padding: 12px;
  border-radius: 12px;
  overflow: hidden;
`;
const StyledPopoverDescription = styled(Typography)`
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 18px;
`;
const StyledPopoverTitle = styled(Typography)`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;
const StyledPopoverActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledCancelButton = styled(StyledSecondaryButton)`
  padding: 4px 8px;
  font-size: 12px;
  height: 32px;
`;
const StyledDeleteButton = styled(StyledPrimaryButton)`
  padding: 4px 8px;
  font-size: 12px;
  height: 32px;
`;
