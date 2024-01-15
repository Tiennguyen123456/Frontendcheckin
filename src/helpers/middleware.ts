import { AppRoutesPermissions } from "../constants/routes";
import { checkPermission } from "../utils/common";

export function checkPermissionForAccessSpecificPage(userPermissions: string[], pathname: string) {
  for (const route of AppRoutesPermissions) {
    if (route.path === pathname) {
      const hasPermission = route.permissions.every((permission) => checkPermission(userPermissions, permission));
      if (hasPermission) {
        return true;
      }
      return false;
    }
  }
  return true;
}
