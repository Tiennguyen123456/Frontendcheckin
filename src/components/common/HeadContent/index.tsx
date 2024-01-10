import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { themeColors } from "../../../theme/theme";

type Props = {
  title: string;
  children?: ReactNode;
};

const HeadContent = ({ title, children }: Props) => {
  return (
    <StyledHeadContent>
      <span className="font-semibold text-xl">{title}</span>

      <div>{children}</div>
    </StyledHeadContent>
  );
};

export default HeadContent;

// Styled
const StyledHeadContent = styled(Box)`
  background-color: ${themeColors.colors.whiteFFF};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 4px;
`;
