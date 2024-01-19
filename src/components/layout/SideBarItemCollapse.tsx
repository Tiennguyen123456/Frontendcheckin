import styled from "@emotion/styled";
import { SubMenu } from "react-pro-sidebar";
import sideBarConfig from "../../configs/SideBarConfig";
import { SideBarItemType } from "../../models/SideBar";
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { checkCurrentPath } from "../../helpers/funcs";
import { useTranslations } from "next-intl";

type Props = {
	item: SideBarItemType;
};

const SideBarItemCollapse = ({ item }: Props) => {
	// ** I18n
	const translation = useTranslations();

	// ** Router
	const pathname = usePathname();

	// ** State
	const [active, setActive] = useState<boolean>(false);

	useEffect(() => {
		const currPage = checkCurrentPath(pathname);
		setActive(currPage && item.path ? currPage.includes(item.path) : false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	if (!item?.sideBarProps) {
		return null;
	}

	return (
		<StyledSubMenu
			defaultOpen={item.path ? checkCurrentPath(pathname)?.includes(item.path) : false}
			active={active}
			icon={item.sideBarProps?.icon}
			label={translation(item.sideBarProps?.displayText)}
		>
			{item.child?.map((route) =>
				route?.child ? (
					<SideBarItemCollapse key={route.key} item={route} />
				) : (
					<SideBarItem key={route.key} item={route} />
				)
			)}
		</StyledSubMenu>
	);
};

export default SideBarItemCollapse;

// Styled
const StyledSubMenu = styled(SubMenu)`
	color: white;
	& .ps-menu-button {
		&.ps-active {
			& .ps-menu-icon,
			& .ps-menu-label {
				color: ${sideBarConfig.colors.activeColor};
			}
		}

		&:hover {
			background-color: ${sideBarConfig.colors.hoverBg} !important;
		}
	}
	& .ps-menuitem-root {
		background-color: ${sideBarConfig.colors.bg};
	}
`;
