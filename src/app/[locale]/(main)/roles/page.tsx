"use client";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { StyledActionGroup, StyledChip } from "../../../../styles/commons";
import { IconButton } from "@mui/material";
import { themeColors } from "../../../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopover from "../../../../components/common/Popover";
import { IDataTable } from "../../../../models/Table";
import Table from "../../../../components/common/Table";

type Props = {};

type RoleRow = {
	id: number;
	code: string;
	name: string;
	enabled: boolean;
};

interface IRoleDataTable extends IDataTable<RoleRow> {
	enabled: any;
}

const RolesPage = (props: Props) => {
	// ** I18n
	const translation = useTranslations();

	// ** State
	const [loadingTable, setLoadingTable] = useState(false);
	const [dataTable, setDataTable] = useState<IRoleDataTable>({
		search: "",
		list: [],
		totalItems: 0,
		paginationModel: {
			page: 0,
			pageSize: 10,
		},
		pageSizeOptions: [10, 20, 50, 100],
		sortModel: [],
		rowSelectionModel: [],
		enabled: {},
	});

	const columns: GridColDef[] = [
		{
			field: "title",
			headerName: translation("rolesPage.table.name"),
			minWidth: 200,
			flex: 1,
		},
		{
			field: "name",
			headerName: translation("rolesPage.table.code"),
			sortable: false,
			minWidth: 250,
			flex: 1,
		},
		{
			field: "enabled",
			headerName: translation("rolesPage.table.status"),
			minWidth: 100,
			headerAlign: "center",
			align: "center",
			sortable: false,
			renderCell: (params) => {
				return (
					<StyledChip className={params.value ? "active" : ""} label={params.value ? "Active" : "Inactive"} />
				);
			},
		},
		{
			field: "",
			headerName: "",
			minWidth: 100,
			headerAlign: "right",
			align: "right",
			sortable: false,
			renderCell: ({ row }) => (
				<StyledActionGroup>
					<IconButton aria-label="edit">
						<EditIcon sx={{ color: themeColors.colors.blue219 }} />
					</IconButton>
					<ConfirmPopover
						id={row?.name}
						onConfirm={() => {}}
						mainTitle={translation("deleteRolePopover.title")}
						subtitle={translation("deleteRolePopover.description")}
						icon={<DeleteIcon sx={{ color: themeColors.colors.redD32, height: "20px", width: "20px" }} />}
					/>
				</StyledActionGroup>
			),
		},
	];

	// ** Functions
	const handleTableChange = (name: string, value: any) => {
		setDataTable((prevDataTable) => ({ ...prevDataTable, [name]: value }));
	};

	const handleFetchData = async () => {
		try {
			setLoadingTable(true);

			let modalSearch: any = {
				page: dataTable.paginationModel.page + 1,
				size: dataTable.paginationModel.pageSize,
			};

			if (dataTable.search) {
				modalSearch["search"] = dataTable.search;
			}

			if (dataTable.enabled?.value !== null && dataTable.enabled?.value !== undefined) {
				modalSearch["enabled"] = dataTable.enabled.value;
			}

			// if (dataTable.sortModel.length > 0) {
			// 	modalSearch["sort"] = sortKeys[dataTable.sortModel?.[0]?.field];
			// 	modalSearch["sortType"] = dataTable.sortModel?.[0]?.sort.toUpperCase();
			// }

			// const response = await getAuthorityListService(modalSearch);
			// if (response.data.success) {
			// 	const { result_info } = response.data;
			// 	setDataTable({
			// 		...dataTable,
			// 		list: result_info?.results,
			// 		totalItems: result_info?.total_items,
			// 	});
			// 	setLoadingTable(false);
			// }
		} catch (error) {
			setLoadingTable(false);
			console.log("error: ", error);
		}
	};

	useEffect(() => {
		handleFetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataTable.paginationModel, dataTable.sortModel]);

	return (
		<div>
			<Table
				dataTable={dataTable}
				columns={columns}
				checkboxSelection
				onChangeTable={handleTableChange}
				loading={loadingTable}
			/>
		</div>
	);
};

export default RolesPage;
