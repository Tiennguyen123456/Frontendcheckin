import { IPermissionRes, IRoleRes } from "@/models/api/authority-api";
import { IListRes } from "@/models/Table";
import { api } from "../configs/axios.config";
import ApiRoutes from "./api.routes";

export const authorityApi = {
  getRoles: async () => {
    const response = await api.get<IResponse<IListRes<IRoleRes>>>(ApiRoutes.getRoles);
    return response.data.data;
  },

  getPermissions: async (paginate: number) => {
    const url = ApiRoutes.getPermissions + `?paginate=${paginate}`;
    const response = await api.get<IResponse<IListRes<IPermissionRes>>>(url);
    return response.data.data;
  },

  getPermissionsFromRole: async (id: number) => {
    const response = await api.get<IPermissionResponse>(ApiRoutes.getPermissionsFromRole + id);
    return response.data.data;
  },

  updatePermissions: async (model: any) => {
    const response = await api.post<IResponse<IPermissionResponse>>(ApiRoutes.updatePermissions, model);
    return response.data.data;
  },

  revokePermissions: async (roleId: number, model: any) => {
    const response = await api.delete<IResponse<IPermissionResponse>>(ApiRoutes.revokePermissions + roleId, model);
    return response.data.data;
  },
};

export default authorityApi;
