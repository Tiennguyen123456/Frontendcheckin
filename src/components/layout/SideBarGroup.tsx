import { Box, Typography } from "@mui/material";
import React from "react";
import { SideBarItemType } from "../../models/SideBar";
import SideBarItemCollapse from "./SideBarItemCollapse";
import SideBarItem from "./SideBarItem";
import { useTranslations } from "next-intl";

type Props = {
	item: SideBarItemType;
};

const SideBarGroup = ({ item }: Props) => {
	// ** I18n
	const translation = useTranslations();

	if (!item.group) {
		return <SideBarItem key={item.key} item={item} />;
	}

	return (
		<Box className="sidebar-group">
			<Typography className="sidebar-group-title px-6 py-3 text-white uppercase font-semibold">
				{translation(item.group?.name)}
			</Typography>
			{item.group?.child.map((route) =>
				route?.child ? (
					<SideBarItemCollapse key={route.key} item={route} />
				) : (
					<SideBarItem key={route.key} item={route} />
				)
			)}
		</Box>
	);
};

export default SideBarGroup;
