import { GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";

export interface IDataTable<T> {
	search: string;
	list: T[];
	totalItems: number;
	paginationModel: {
		page: number;
		pageSize: number;
	};
	pageSizeOptions: number[];
	sortModel: GridSortModel;
	rowSelectionModel: GridRowSelectionModel;
}
