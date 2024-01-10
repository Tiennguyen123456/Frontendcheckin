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
};

export default function ConfirmPopover({ id, onConfirm, mainTitle, subtitle, icon }: Props) {
  const translation = useTranslations();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeletePopover, setShowDeletePopover] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleCloseDeletePopover = () => {
    setAnchorEl(null);
    setShowDeletePopover(false);
  };

  const handleShowDeletePopover = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setShowDeletePopover(true);
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      await onConfirm(id);
      setLoadingDelete(false);
      handleCloseDeletePopover();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" id="delete-popover" onClick={handleShowDeletePopover}>
        {icon}
      </IconButton>
      <StyledPopover
        id={"delete-popover"}
        open={showDeletePopover}
        anchorEl={anchorEl}
        onClose={handleCloseDeletePopover}
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
            <StyledCancelButton onClick={handleCloseDeletePopover} sx={{ color: themeColors.colors.redD32 }}>
              {translation("action.cancel")}
            </StyledCancelButton>
            <StyledDeleteButton
              loading={loadingDelete}
              loadingPosition="start"
              sx={{ backgroundColor: themeColors.colors.redD32 }}
              onClick={handleDelete}
            >
              {translation("action.delete")}
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
