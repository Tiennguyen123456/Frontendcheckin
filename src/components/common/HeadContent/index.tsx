"use client";
import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import { themeColors } from "../../../theme/theme";
import Breadcrumbs from "../Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  children?: ReactNode;
  hasBackBtn?: boolean;
};

const HeadContent = ({ title, children, hasBackBtn = false }: Props) => {
  // ** Router
  const router = useRouter();

  // ** Functions
  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="mr-5 mb-4">
        <Breadcrumbs />
      </div>

      <StyledHeadContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            {hasBackBtn && (
              <IconButton onClick={handleBack}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            )}

            <span className="font-semibold text-xl">{title}</span>
          </div>

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
