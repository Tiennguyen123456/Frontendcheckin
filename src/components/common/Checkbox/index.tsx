"use client";
import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface ICheckbox {
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

function CustomCheckbox({ label = "", disabled, checked = false, onChange = (value) => {} }: ICheckbox) {
  return (
    <StyledFormGroupCheckbox>
      <FormControlLabel
        control={<Checkbox disabled={disabled} checked={checked} onChange={(e) => onChange(e.target.checked)} />}
        label={label}
      />
    </StyledFormGroupCheckbox>
  );
}

export default CustomCheckbox;

// Styled
const StyledFormGroupCheckbox = styled(FormGroup)`
  .MuiFormControlLabel-root {
    margin-left: -9px;
  }
  .MuiButtonBase-root.Mui-checked:not(.Mui-disabled) {
    color: ${themeColors.colors.blackRgba80};
  }
`;
