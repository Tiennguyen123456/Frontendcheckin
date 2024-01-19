import { api } from "../configs/axios.config";
import { ILogin, ILoginRes } from "../models/api/auth-api";
import ApiRoutes from "./api.routes";

const authApi = {
	login: (body: ILogin) => {
		return api.post<IResponse<ILoginRes>>(ApiRoutes.login, body);
	},
};

export default authApi;
