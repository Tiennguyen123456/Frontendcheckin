"use client";
import React, { useEffect, useState } from "react";
import HeadContent from "../../../../components/common/HeadContent";
import { useTranslations } from "next-intl";
import { IDataTable } from "../../../../models/Table";
import { GridColDef } from "@mui/x-data-grid";
import {
  StyledActionGroup,
  StyledChip,
  StyledContentWrapper,
  StyledIconBtn,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../../../styles/commons";
import { IconButton, Grid } from "@mui/material";
import AutoComplete from "../../../../components/common/AutoComplete";
import ConfirmPopover from "../../../../components/common/Popover";
import { themeColors } from "../../../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Input from "../../../../components/common/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table from "../../../../components/common/Table";
import { getColorTagEventStatus } from "../../../../utils/common";

type Props = {};

type EventRowType = {
  id: number;
  code: string;
  name: string;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  status: string;
};

interface IEventDataTable extends IDataTable<EventRowType> {
  enabled: any;
}

const rows: EventRowType[] = [
  {
    id: 1,
    code: "20230101",
    end_date: "2024-01-20",
    name: "BIDV event",
    number_of_guests: 231,
    start_date: "2024-01-20",
    status: "NEW",
  },
  {
    id: 2,
    code: "20230101",
    end_date: "2023-12-20",
    name: "BBB event",
    number_of_guests: 123,
    start_date: "2023-12-20",
    status: "ACTIVE",
  },
  {
    id: 3,
    code: "20230101",
    end_date: "2023-12-20",
    name: "BBB event",
    number_of_guests: 123,
    start_date: "2023-12-20",
    status: "INACTIVE",
  },
  {
    id: 4,
    code: "20230101",
    end_date: "2023-12-20",
    name: "BBB event",
    number_of_guests: 123,
    start_date: "2023-12-20",
    status: "DONE",
  },
  {
    id: 5,
    code: "20230101",
    end_date: "2023-12-20",
    name: "BBB event",
    number_of_guests: 123,
    start_date: "2023-12-20",
    status: "CANCEL",
  },
];

const EventsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState<IEventDataTable>({
    search: "",
    list: rows,
    totalItems: 0,
    paginationModel: {
      page: 0,
      paginate: 10,
    },
    pageSizeOptions: [10, 20, 50, 100],
    sortModel: [],
    rowSelectionModel: [],
    enabled: {},
  });

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: translation("eventsPage.table.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: translation("eventsPage.table.code"),
      sortable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "start_date",
      headerName: translation("eventsPage.table.startDate"),
      sortable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "end_date",
      headerName: translation("eventsPage.table.endDate"),
      sortable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "number_of_guests",
      headerName: translation("eventsPage.table.numberOfGuest"),
      sortable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "status",
      headerName: translation("rolesPage.table.status"),
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <StyledChip className={getColorTagEventStatus(params.value)}>
            {params.value ? "Active" : "Inactive"}
          </StyledChip>
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
        size: dataTable.paginationModel.paginate,
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
    // handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <div className="p-3">
      <HeadContent title={translation("eventsPage.title")}>
        <div className="flex gap-x-3">
          <StyledPrimaryButton size="small" startIcon={<AddIcon />}>
            {translation("action.create")}
          </StyledPrimaryButton>
          <StyledSecondaryButton
            size="small"
            startIcon={<HighlightOffIcon />}
            sx={{ color: themeColors.colors.redD32 }}
          >
            {translation("action.delete")}
          </StyledSecondaryButton>
        </div>
      </HeadContent>

      <StyledContentWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item container xs={8}>
            <Grid container gap={2} alignItems="end">
              <Grid item xs={4}>
                <Input
                  label="Search"
                  placeholder={"Name, Code"}
                  value={dataTable.search}
                  onChange={(search) => handleTableChange("search", search)}
                />
              </Grid>
              <Grid item xs={2.5}>
                <AutoComplete
                  label={translation("label.active")}
                  value={dataTable.enabled}
                  options={[
                    { label: "Active", value: true },
                    { label: "Inactive", value: false },
                  ]}
                  onChange={(data) => handleTableChange("enabled", data)}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledIconBtn
                  variant="outlined"
                  startIcon={<SearchIcon sx={{ height: "24px", width: "24px" }} />}
                  onClick={handleFetchData}
                ></StyledIconBtn>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Table
          dataTable={dataTable}
          columns={columns}
          checkboxSelection
          onChangeTable={handleTableChange}
          loading={loadingTable}
        />
      </StyledContentWrapper>
    </div>
  );
};

export default EventsPage;
