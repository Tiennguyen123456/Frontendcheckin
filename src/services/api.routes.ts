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

  // ** Account Routes
  getUsers: baseURL + "/users",
  storeUser: baseURL + "/user/store",
  deleteUser: baseURL + "/user/delete/",

  // ** Company Routes
  getCompanies: baseURL + "/companies",
  getCompanyDetails: baseURL + "/company/",
  storeCompany: baseURL + "/company/store",
  deleteCompany: baseURL + "/company/delete/",

  // ** Event Routes
  getEvents: baseURL + "/events",
  getEventDetails: baseURL + "/event/",
  storeEvent: baseURL + "/event/store",
  deleteEvent: baseURL + "/event/delete/",
};

export default ApiRoutes;
