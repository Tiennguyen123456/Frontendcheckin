import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function useCustomRouter() {
  // ** I18n
  const locale = useLocale();

  // ** Router
  const router = useRouter();

  const routerWithLocale = (pathname: string) => {
    router.push(locale ? `/${locale}/${pathname}` : pathname);
  };

  return routerWithLocale;
}
