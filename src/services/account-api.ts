import { IAccountRes } from "@/models/api/account-api";
import { IListRes } from "@/models/Table";
import { api } from "../configs/axios.config";
import ApiRoutes from "./api.routes";

const accountApi = {
  getUsersWithParams: async (model: any) => {
    const response = await api.get<IResponse<IListRes<IAccountRes>>>(ApiRoutes.getUsers, {
      params: model,
    });
    return response.data;
  },

  storeUser: async (body: any) => {
    const response = await api.post<IResponse<IAccountRes>>(ApiRoutes.storeUser, body);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await api.delete<IResponse<IAccountRes>>(ApiRoutes.deleteUser + id);
    return response.data;
  },
};

export default accountApi;
