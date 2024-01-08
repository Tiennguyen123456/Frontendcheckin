import { ROUTES } from "../constants/routes";
import { StyledSeePassword } from "../styles/commons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function checkCurrentPath(pathname: string) {
	const matchCurrentPage: string[] = [];

	const keys = Object.keys(ROUTES) as Array<keyof typeof ROUTES>;
	keys.forEach((key) => {
		if (pathname.includes(ROUTES[key])) {
			matchCurrentPage.push(ROUTES[key]);
		}
	});

	const currentPage =
		matchCurrentPage.length > 0
			? matchCurrentPage.reduce(
					(routeA, routeB) => (routeA.length > routeB.length ? routeA : routeB),
					matchCurrentPage[0]
			  )
			: undefined;
	return currentPage;
}

export const handleRenderIconSeePassword = (isToggle: boolean, clickCallback: () => void) => {
	return (
		<StyledSeePassword onClick={() => clickCallback()}>
			{isToggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
		</StyledSeePassword>
	);
};
