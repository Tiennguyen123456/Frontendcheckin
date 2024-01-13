"use client";
import { ROUTES } from "@/constants/routes";
import { StyledPrimaryButton } from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <StyledWrapper>
      <Styled404>403</Styled404>
      <StyledTitle>Unauthorized - Access Denied!</StyledTitle>
      <StyledDescription>
        You do not have the necessary permissions to view the requested page or resource.
      </StyledDescription>
      <StyledBackButton onClick={handleBackToDashboard}>Back To Dashboard</StyledBackButton>
    </StyledWrapper>
  );
}

// styled
const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const StyledTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 20px 0;
`;

const StyledDescription = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  margin: 0;
`;

const Styled404 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 250px;
  font-weight: 900;
  color: ${themeColors.colors.grayDCD}80;
  z-index: -1;
`;

const StyledBackButton = styled(StyledPrimaryButton)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
