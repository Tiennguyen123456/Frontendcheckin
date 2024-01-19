import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { StyledLabel } from "../../../styles/commons";
import clsx from "clsx";
import { FormHelperText } from "@mui/material";
import { themeColors } from "../../../theme/theme";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  error?: boolean;
  helperText?: string;
  minRows?: number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  [x: string]: any;
};

export default function StyledTextArea({
  error,
  helperText,
  isRequired = false,
  label,
  onBlur = (value: string) => {},
  onChange = (value: string) => {},
  placeholder,
  readOnly = false,
  value = "",
  minRows = 3,
}: Props) {
  return (
    <div>
      <StyledLabel className={clsx("mb-2", !readOnly && isRequired ? "required-field" : "")} id="select-label">
        {label}
      </StyledLabel>

      <TextareaAutosize
        aria-label="empty textarea"
        value={value}
        placeholder={placeholder}
        onChange={(e: any) => onChange(e.target.value)}
        onBlur={(e: any) => onBlur(e.target.value.trim())}
        className={clsx(error && "error")}
        minRows={minRows}
      />

      {helperText && <FormHelperText sx={{ marginLeft: 0, fontSize: "14px" }}>{helperText}</FormHelperText>}
    </div>
  );
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding: 16.5px 14px;
  border-radius: 4px;
  background: ${themeColors.colors.whiteFFF};
  border: 1px solid ${themeColors.colors.blackRgba23};
  box-sizing: border-box;

  &.error {
    border-color: ${themeColors.colors.redD32}
  }

  &:focus {
    border-width: 2px;
    border-color: ${themeColors.colors.blackRgba60};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }

  &::placeholder {
    font-size: 16px;
    color: ${themeColors.colors.blackRgba38};
  }
`,
);
