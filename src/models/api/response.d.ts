declare interface IResponse<T> {
	status: string;
	status_code: number;
	message: string;
	data: T;
}
