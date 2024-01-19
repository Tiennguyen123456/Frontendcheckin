import { IAccountRes } from "@/models/api/account-api";
import { ICompanyRes } from "@/models/api/company-api";
import { IListRes } from "@/models/Table";
import { api } from "../configs/axios.config";
import ApiRoutes from "./api.routes";

const companyApi = {
  getCompanies: async () => {
    const response = await api.get<IResponse<IListRes<ICompanyRes>>>(ApiRoutes.getCompanies);
    return response.data.data;
  },

  getCompaniesWithParams: async (model: any) => {
    const response = await api.get<IResponse<IListRes<ICompanyRes>>>(ApiRoutes.getCompanies, {
      params: model,
    });
    return response.data;
  },

  storeCompany: async (body: any) => {
    const response = await api.post<IResponse<ICompanyRes>>(ApiRoutes.storeCompany, body);
    return response.data;
  },

  getCompanyDetails: async (id: any) => {
    const response = await api.get<IResponse<ICompanyRes>>(ApiRoutes.getCompanyDetails + id);
    return response.data;
  },

  deleteCompany: async (id: number) => {
    const response = await api.delete<IResponse<ICompanyRes>>(ApiRoutes.deleteCompany + id);
    return response.data;
  },
};

export default companyApi;
