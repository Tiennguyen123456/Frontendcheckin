import styled from "@emotion/styled";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import sideBarConfig from "../../configs/SideBarConfig";
import { checkCurrentPath } from "../../helpers/funcs";
import { SideBarItemType } from "../../models/SideBar";

type Props = {
  item: SideBarItemType;
};

const SideBarItem = ({ item }: Props) => {
  // ** I18n
  const translation = useTranslations();
  const locale = useLocale();

  // ** Router
  const router = useRouter();
  const pathname = usePathname();

  // ** State
  const [active, setActive] = useState<boolean>(false);

  // ** Functions
  const handleClick = () => {
    if (item.path) {
      router.push(locale ? `/${locale}/${item.path}` : item.path);
    }
  };

  useEffect(() => {
    const currPage = checkCurrentPath(pathname);
    setActive(currPage === item.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!item.sideBarProps) {
    return null;
  }

  return (
    <StyledMenuItem active={active} onClick={handleClick} icon={item.sideBarProps?.icon}>
      {translation(item.sideBarProps?.displayText)}
    </StyledMenuItem>
  );
};

export default SideBarItem;

// Styled
const StyledMenuItem = styled(MenuItem)`
  position: relative;
  color: white;

  & .ps-menu-button {
    &:hover,
    &.ps-active {
      background-color: ${sideBarConfig.colors.hoverBg} !important;
      color: ${sideBarConfig.colors.activeColor};

      &::after {
        content: "";
        position: absolute;
        right: 0;
        height: 100%;
        width: 4px;
        background-color: ${sideBarConfig.colors.activeColor};
      }
    }
  }
`;
