"use client";
import styled from "@emotion/styled";
import { Logout, Settings } from "@mui/icons-material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { AppBar, Avatar, Badge, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import sideBarConfig from "../../configs/SideBarConfig";
import topBarConfig from "../../configs/TopBarConfig";
import { DeviceType } from "../../constants/enum";
import { selectCommon, toggleCollapseSideBar, toggleSideBar } from "../../redux/common/slice";
import { useAppDispatch, useAppSelector } from "../../redux/root/hooks";
import LocaleSwitcherSelect from "../common/Select/LocaleSwitcherSelect";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../constants/routes";
import { selectUser } from "../../redux/user/slice";

type Props = {};

const TopBar = (props: Props) => {
	// ** Redux
	const dispatch = useAppDispatch();
	const { isSideBarCollapse, deviceType } = useAppSelector(selectCommon);
	const { userProfile } = useAppSelector(selectUser);

	// ** State
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	// ** Router
	const router = useRouter();

	// ** Variables
	const open = Boolean(anchorEl);

	// ** Functions
	const handleToggleSideBar = () => {
		dispatch(deviceType === DeviceType.Mobile ? toggleSideBar() : toggleCollapseSideBar());
	};

	const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseAccountMenu = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		Cookies.remove("authorization");
		router.push(ROUTES.LOGIN);
	};

	return (
		<StyledAppBar
			position="fixed"
			className={clsx(isSideBarCollapse && deviceType !== DeviceType.Mobile && "sidebar-collapse")}
		>
			<Toolbar className="flex justify-between">
				<IconButton onClick={handleToggleSideBar}>
					<MenuOpenIcon />
				</IconButton>

				<Box className="flex items-center gap-x-3">
					<LocaleSwitcherSelect />

					<IconButton>
						<StyledBadge badgeContent={4}>
							<SmsOutlinedIcon fontSize="small" />
						</StyledBadge>
					</IconButton>

					<IconButton>
						<StyledBadge badgeContent={4}>
							<NotificationsOutlinedIcon fontSize="small" />
						</StyledBadge>
					</IconButton>

					<Box
						className="flex items-center gap-x-2 cursor-pointer"
						onClick={handleClickAvatar}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar className="!h-8 !w-8" src={userProfile?.avatar_path} />
						<span className="hidden md:block">{userProfile?.name || "Guest"}</span>
					</Box>
				</Box>
			</Toolbar>

			<Menu
				autoFocus={false}
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleCloseAccountMenu}
				onClick={handleCloseAccountMenu}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem>
					<ListItemIcon>
						<PersonIcon fontSize="small" />
					</ListItemIcon>
					My account
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</StyledAppBar>
	);
};

export default TopBar;

// Styled
const StyledAppBar = styled(AppBar)`
	box-shadow: unset;
	background-color: ${topBarConfig.backgroundColor};
	color: ${topBarConfig.color};
	transition: width 0.3s;
	z-index: 2;

	@media only screen and (min-width: 640px) {
		width: calc(100% - ${sideBarConfig.width});
		margin-left: ${sideBarConfig.width};
	}

	&.sidebar-collapse {
		width: calc(100% - 80px);
		margin-left: 80px;
	}
`;

const StyledBadge = styled(Badge)`
	& .MuiBadge-badge {
		color: white;
		background-color: #ff4d4f;
	}
`;

const StyledMenuItem = styled(MenuItem)`
	&:not(:last-child) {
		margin-bottom: 4px;
	}
	&.Mui-selected {
		background-color: #2196f3;
		color: #fff;
	}
	&:hover {
		background-color: rgba(33, 150, 243, 0.08);
		&.Mui-selected {
			background-color: #2196f3;
		}
	}
	&.active {
		border-radius: 4px;
		background-color: #2196f3;
		font-weight: 500;
		color: #fff;
	}
	span {
		font-weight: 600;
		padding-right: 12px;
	}
`;
