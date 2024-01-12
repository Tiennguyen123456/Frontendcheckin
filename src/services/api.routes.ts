const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ApiRoutes = {
  // ** Auth Routes
  login: baseURL + "/login",

  // ** Profile Routes
  getProfile: baseURL + "/self",

  // ** Authority Routes
  getRoles: baseURL + "/roles",
  storeRole: baseURL + "/role/store",
  getPermissions: baseURL + "/permissions",
  getPermissionsFromRole: baseURL + "/permissions/role/",
  updatePermissions: baseURL + "/permission/assign",
  revokePermissions: baseURL + "/permission/revoke/",
};

export default ApiRoutes;
