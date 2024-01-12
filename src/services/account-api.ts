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
};

export default accountApi;
