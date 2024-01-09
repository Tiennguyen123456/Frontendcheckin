"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "../../i18n-configurations/i18n-navigation";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

interface Props {
	children: ReactNode;
}

export default function Providers({ children }: Props) {
	// ** I18n
	const router = useRouter();
	const pathname = usePathname();

	// ** React-hot-toast
	const { toasts } = useToasterStore();
	const TOAST_LIMIT = 1;

	useEffect(() => {
		const language = localStorage.getItem("locale");
		if (language) {
			router.replace(pathname, { locale: language });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
			.forEach((t) => toast.dismiss(t.id));
	}, [toasts]);

	return (
		<Provider store={store}>
			{children}
			<Toaster
				toastOptions={{
					className: "z-[500]",
				}}
			/>
		</Provider>
	);
}
