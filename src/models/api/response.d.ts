declare interface IResponse<T> {
  status: string;
  status_code: number;
  message_code: string;
  message: string;
  data: T;
}
