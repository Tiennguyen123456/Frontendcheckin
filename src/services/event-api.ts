import {
  IDeleteEventConfigFields,
  IEventConfigFieldsRes,
  IEventRes,
  IUpdateEventConfigFields,
} from "@/models/api/event-api";
import { IListRes } from "@/models/Table";
import { api } from "../configs/axios.config";
import ApiRoutes from "./api.routes";

const eventApi = {
  getEventsWithParams: async (model: any) => {
    const response = await api.get<IResponse<IListRes<IEventRes>>>(ApiRoutes.getEvents, {
      params: model,
    });
    return response.data;
  },

  storeEvent: async (body: any) => {
    const response = await api.post<IResponse<IEventRes>>(ApiRoutes.storeEvent, body);
    return response.data;
  },

  getEventDetails: async (id: any) => {
    const response = await api.get<IResponse<IEventRes>>(ApiRoutes.getEventDetails + id);
    return response.data;
  },

  deleteEvent: async (id: number) => {
    const response = await api.delete<IResponse<IEventRes>>(ApiRoutes.deleteEvent + id);
    return response.data;
  },

  getEventConfigFields: async (eventId: string) => {
    const url = ApiRoutes.getEventConfigFields + `/${eventId}/fields`;

    const response = await api.get<IResponse<IEventConfigFieldsRes>>(url);
    return response.data;
  },

  updateEventConfigFields: async (body: IUpdateEventConfigFields) => {
    const response = await api.post<IResponse<any>>(ApiRoutes.updateEventConfigFields, body);
    return response.data;
  },

  deleteEventConfigFields: async (body: IDeleteEventConfigFields) => {
    const response = await api.post<IResponse<any>>(ApiRoutes.deleteEventConfigFields, body);
    return response.data;
  },
};

export default eventApi;
