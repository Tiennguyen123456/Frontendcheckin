"use client";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { themeColors } from "../../../theme/theme";
import Breadcrumbs from "../Breadcrumbs";

type Props = {
  title: string;
  children?: ReactNode;
};

const HeadContent = ({ title, children }: Props) => {
  return (
    <div>
      <div className="mr-5 mb-4">
        <Breadcrumbs />
      </div>

      <StyledHeadContent>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">{title}</span>

          <div>{children}</div>
        </div>
      </StyledHeadContent>
    </div>
  );
};

export default HeadContent;

// Styled
const StyledHeadContent = styled(Box)`
  background-color: ${themeColors.colors.whiteFFF};
  padding: 20px;
  margin: 0 -12px 20px -12px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
