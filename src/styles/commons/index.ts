"use client";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { themeColors } from "../../theme/theme";
import { Box, Button, Chip, Popover } from "@mui/material";
import { ISecondaryButton } from "../../models/Button";

export const StyledPrimaryButton = styled(LoadingButton)`
  background-color: ${(props) => props.sx?.backgroundColor || themeColors.colors.blackRgba87};
  padding: ${(props) => (props.size === "small" ? "8px 16px" : "13.5px 16px")};

  color: ${(props) => props.color || themeColors.colors.whiteFFF};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.sx?.backgroundColor || themeColors.colors.blackRgba87};
  }
  &:disabled {
    opacity: 0.6;
    color: ${(props) => props.color || themeColors.colors.whiteFFF};
  }

  & .MuiLoadingButton-loadingIndicatorStart {
    position: static;
    margin-right: 8px;
  }
`;

export const StyledSecondaryButton = styled(LoadingButton)`
  padding: ${(props) => (props.size === "small" ? "8px 16px" : "13.5px 16px")};
  border: 1px solid ${(props) => props.sx?.color || themeColors.colors.blackRgba87};
  border-radius: 4px;
  background-color: ${themeColors.colors.whiteFFF};

  color: ${(props) => props.sx?.color || themeColors.colors.blackRgba87};
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  &.color-red {
    color: ${themeColors.colors.redD32};
  }

  &:hover {
    opacity: 0.8;
    background-color: ${themeColors.colors.whiteFFF};
  }

  &:disabled {
    opacity: 0.8;
    border-color: ${themeColors.colors.blackRgba32};
  }

  & .MuiLoadingButton-loadingIndicatorStart {
    position: static;
    margin-right: 8px;
  }
`;

export const StyledForm = styled.form`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;
export const StyledFormItem = styled.div`
  width: calc(50% - 8px);
  position: relative;
`;

export const StyledSeePassword = styled(Box)`
  position: absolute;
  right: 12px;
  top: 24px;
  transform: translate(0, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${themeColors.colors.blackRgba60};
  }
`;
export const StyledChip = styled(Chip)`
  background-color: ${themeColors.colors.blackRgba08};
  color: ${themeColors.colors.black000};
  &.active {
    background-color: ${themeColors.colors.green2E7};
    color: ${themeColors.colors.whiteFFF};
  }
`;
export const StyledActionGroup = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  .MuiButtonBase-root {
    padding: 4px;
    .MuiSvgIcon-root {
      width: 22px;
      height: 22px;
    }
  }
`;
export const StyledPopover = styled(Popover)`
  & .MuiPaper-root {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
export const StyledPageContent = styled(Box)`
  width: 100%;
  height: 100%;

  padding: 24px 48px 32px 24px;
  background-color: ${themeColors.colors.grayF2F};

  overflow-x: hidden;
  overflow-y: auto;
`;
export const StyledContentWrapper = styled(Box)`
  width: 100%;
  height: auto;
  min-height: calc(100% - 106px);

  padding: 16px 16px 24px;
  background-color: ${themeColors.colors.whiteFFF};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
`;
export const StyledIconBtn = styled(Button)`
  color: ${themeColors.colors.blackRgba87};
  border: 1px solid ${themeColors.colors.blackRgba87};
  padding: 10.5px 16px;
  & .MuiButton-startIcon {
    margin: 0;
  }

  &:hover {
    opacity: 0.8;
    background-color: ${themeColors.colors.whiteFFF};
    border-color: ${themeColors.colors.blackRgba87};
  }
`;
