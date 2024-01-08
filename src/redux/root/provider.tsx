"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "../../i18n-configurations/i18n-navigation";

interface Props {
	children: ReactNode;
}

export default function Providers({ children }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const language = localStorage.getItem("locale");
		if (language) {
			router.replace(pathname, { locale: language });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Provider store={store}>{children}</Provider>;
}
