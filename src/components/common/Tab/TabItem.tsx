import styled from "@emotion/styled";
import clsx from "clsx";
import React, { ReactNode } from "react";
import sideBarConfig from "../../../configs/SideBarConfig";

type Props = {
  icon: ReactNode;
  label: string;
  active?: boolean;
};

const TabItem = ({ icon, label, active = false }: Props) => {
  return (
    <StyledTabItem className={clsx(active && "active")}>
      {icon}
      <span>{label}</span>
    </StyledTabItem>
  );
};

export default TabItem;

//Styled
const StyledTabItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 16px 12px;
  cursor: pointer;

  &.active {
    background-color: ${sideBarConfig.colors.bg};
    color: ${sideBarConfig.colors.activeColor};

    &::after {
      content: "";
      position: absolute;
      right: 0;
      height: 56px;
      width: 4px;
      background-color: ${sideBarConfig.colors.activeColor};
    }
  }

  &:hover {
    background-color: ${sideBarConfig.colors.hoverBg};
    color: ${sideBarConfig.colors.activeColor};
  }
`;
