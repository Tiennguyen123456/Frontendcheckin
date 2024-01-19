"use client";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Menu, Sidebar } from "react-pro-sidebar";
import sideBarConfig from "../../configs/SideBarConfig";
import { ROUTES } from "../../constants/routes";
import { selectCommon, toggleSideBar } from "../../redux/common/slice";
import { useAppDispatch, useAppSelector } from "../../redux/root/hooks";
import SideBarGroup from "./SideBarGroup";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SideBarItemType } from "../../models/SideBar";
import { selectUser } from "../../redux/user/slice";
import { getAppRoutesBaseOnPermission } from "../../helpers/funcs";

type Props = {};

const CustomSideBar = (props: Props) => {
  // ** Redux
  const dispatch = useAppDispatch();
  const { isSideBarCollapse, isSideBarToggle } = useAppSelector(selectCommon);
  const { userPermissions, userProfile } = useAppSelector(selectUser);

  // ** State
  const [appRoutes, setAppRoutes] = useState<SideBarItemType[]>([]);

  useEffect(() => {
    if (userPermissions.length > 0) {
      setAppRoutes(getAppRoutesBaseOnPermission(userPermissions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPermissions?.length && userProfile?.id]);

  return (
    <StyledSidebar
      backgroundColor={sideBarConfig.colors.bg}
      toggled={isSideBarToggle}
      collapsed={isSideBarCollapse}
      onBackdropClick={() => dispatch(toggleSideBar())}
      collapsedWidth="80px"
      transitionDuration={300}
      breakPoint="sm"
      rootStyles={{
        width: "300px",
        "&.ps-broken": {
          left: "-300px",
        },
      }}
    >
      <StyledHeadLogo>
        <Link href={ROUTES.DASHBOARD}>
          <Image src={sideBarConfig.images.logo} alt="logo" />
        </Link>
      </StyledHeadLogo>
      <Menu
        closeOnClick
        renderExpandIcon={({ open }) => (
          <>
            {isSideBarCollapse ? (
              <div>
                <FiberManualRecordIcon sx={{ height: "10px", width: "10px" }} />
              </div>
            ) : (
              <div className={clsx("h-6 w-6 transition-transform duration-200 ease-in-out", open && "rotate-90")}>
                <KeyboardArrowRightIcon />
              </div>
            )}
          </>
        )}
      >
        {appRoutes.map((route) => (
          <SideBarGroup key={route.key} item={route} />
        ))}
      </Menu>
    </StyledSidebar>
  );
};

export default CustomSideBar;

// Styled
const StyledHeadLogo = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 13px 0;
`;

const StyledSidebar = styled(Sidebar)`
  &.ps-collapsed .sidebar-group .sidebar-group-title {
    visibility: hidden;
  }
`;
