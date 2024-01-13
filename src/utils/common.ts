import { EventStatus } from "../constants/enum";
import { locales } from "../i18n-configurations/config";

export function getColorTagEventStatus(eventStatus: string) {
  switch (eventStatus) {
    case EventStatus.Active:
      return "event-active";
    case EventStatus.Cancel:
      return "event-cancel";
    case EventStatus.Done:
      return "event-done";
    case EventStatus.Inactive:
      return "event-inactive";
    case EventStatus.New:
      return "event-new";
    default:
      return "";
  }
}

export function checkPermission(permissions: string[], action: string) {
  const index = permissions.findIndex((item) => item === action);
  if (index >= 0) return true;
  else return false;
}

export function removeLocaleFromPathname(pathname: string) {
  let newPath = pathname;

  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    if (pathname.startsWith(`/${locale}`)) {
      const splitPath = pathname.split(`/${locale}`);
      if (splitPath.length > 1) {
        newPath = splitPath[1];
        break;
      }
    }
  }

  return newPath;
}
