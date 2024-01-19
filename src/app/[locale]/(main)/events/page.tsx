"use client";
import { IEventRes } from "@/models/api/event-api";
import eventApi from "@/services/event-api";
import { toastError, toastSuccess } from "@/utils/toast";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AutoComplete from "../../../../components/common/AutoComplete";
import CustomIconBtn from "../../../../components/common/Button/CustomIconBtn";
import HeadContent from "../../../../components/common/HeadContent";
import ConfirmPopover from "../../../../components/common/Popover";
import Table from "../../../../components/common/Table";
import Input from "../../../../components/common/TextField";
import { ROUTES } from "../../../../constants/routes";
import { DateFormat, EventStatusOptions } from "../../../../constants/variables";
import useCustomRouter from "../../../../hooks/useCustomRouter";
import { IDataTable } from "../../../../models/Table";
import {
  StyledActionGroup,
  StyledChip,
  StyledContentWrapper,
  StyledIconBtn,
  StyledLink,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../../../styles/commons";
import { themeColors } from "../../../../theme/theme";
import { getColorTagEventStatus, getTextEventStatus } from "../../../../utils/common";

type Props = {};

interface IEventDataTable extends IDataTable<IEventRes> {
  status: any;
}

const EventsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Custom Hook
  const routerPushWithLocale = useCustomRouter();

  // ** State
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState<IEventDataTable>({
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
    status: {},
  });

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: translation("eventsPage.table.code"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: translation("eventsPage.table.name"),
      sortable: false,
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => (
        <div>
          <StyledLink href={ROUTES.CLIENTS} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ columnGap: "6px", marginRight: "4px" }}>{row?.name || translation("label.notAvailable")}</Box>
            <AccountBoxIcon />
          </StyledLink>
        </div>
      ),
    },
    {
      field: "from_date",
      headerName: translation("eventsPage.table.startDate"),
      sortable: false,
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => (
        <span>
          {dayjs(row.from_date).isValid() ? dayjs(row.update_at).format(DateFormat) : translation("label.notAvailable")}
        </span>
      ),
    },
    {
      field: "end_date",
      headerName: translation("eventsPage.table.endDate"),
      sortable: false,
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => (
        <span>
          {dayjs(row.end_date).isValid() ? dayjs(row.update_at).format(DateFormat) : translation("label.notAvailable")}
        </span>
      ),
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
          <StyledChip className={getColorTagEventStatus(params.value)}>{getTextEventStatus(params.value)}</StyledChip>
        );
      },
    },
    {
      field: "",
      headerName: "",
      minWidth: 200,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: ({ row }) => (
        <StyledActionGroup>
          <IconButton onClick={() => handleClickConfig(row.id)}>
            <SettingsIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleClickEdit(row.id)}>
            <EditIcon sx={{ color: themeColors.colors.blue219 }} />
          </IconButton>
          <IconButton>
            <GroupsIcon />
          </IconButton>
          <ConfirmPopover
            id={row?.name}
            onConfirm={() => handleClickDelete(row.id)}
            mainTitle={translation("deletePopover.titleEvent")}
            subtitle={translation("deletePopover.description")}
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

  const handleClickEdit = (eventId: number) => {
    routerPushWithLocale(ROUTES.EVENTS_DETAILS + `/${eventId}`);
  };

  const handleClickConfig = (eventId: number) => {
    routerPushWithLocale(ROUTES.EVENTS_CONFIG + `/${eventId}`);
  };

  const handleFetchData = async () => {
    try {
      setLoadingTable(true);

      let modalSearch: any = {
        page: dataTable.paginationModel.page + 1,
        size: dataTable.paginationModel.pageSize,
      };

      // if (dataTable.search) {
      //   modalSearch["search"] = dataTable.search;
      // }

      // if (dataTable.enabled?.value !== null && dataTable.enabled?.value !== undefined) {
      //   modalSearch["enabled"] = dataTable.enabled.value;
      // }

      // if (dataTable.sortModel.length > 0) {
      // 	modalSearch["sort"] = sortKeys[dataTable.sortModel?.[0]?.field];
      // 	modalSearch["sortType"] = dataTable.sortModel?.[0]?.sort.toUpperCase();
      // }

      const response = await eventApi.getEventsWithParams(modalSearch);
      if (response.status === "success") {
        setDataTable((preValue) => ({
          ...preValue,
          list: response.data.collection,
          totalItems: response.data.pagination.meta.total,
        }));
      }
      setLoadingTable(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClickAddEvent = () => {
    routerPushWithLocale(ROUTES.EVENTS_CREATE);
  };

  const handleClickDelete = async (eventId: number) => {
    try {
      setLoadingTable(false);
      const response = await eventApi.deleteEvent(eventId);
      if (response.status === "success") {
        toastSuccess(translation("successApi.DELETE_EVENT_SUCCESS"));
        handleFetchData();
        setLoadingTable(true);
      }
    } catch (error: any) {
      setLoadingTable(false);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.DELETE_EVENT_FAILED"));
      }
    }
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <div className="p-3">
      <HeadContent title={translation("eventsPage.title")}>
        <div className="hidden md:flex gap-x-3">
          <StyledPrimaryButton size="small" startIcon={<AddIcon />} onClick={handleClickAddEvent}>
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

        <div className="flex gap-x-3 md:hidden">
          <CustomIconBtn onClick={handleClickAddEvent}>
            <AddIcon />
          </CustomIconBtn>
          <CustomIconBtn type="secondary" className="text-red-600 border-red-600">
            <DeleteIcon />
          </CustomIconBtn>
        </div>
      </HeadContent>

      <StyledContentWrapper>
        <div className="flex flex-wrap gap-x-3 gap-y-4 mb-5">
          <div className="w-full md:w-52">
            <Input
              label={translation("label.search")}
              placeholder={"Name, Code"}
              value={dataTable.search}
              onChange={(search) => handleTableChange("search", search)}
            />
          </div>
          <div className="w-1/2 md:w-32">
            <AutoComplete
              label={translation("label.active")}
              value={dataTable.status}
              options={EventStatusOptions}
              onChange={(data) => handleTableChange("enabled", data)}
            />
          </div>
          <div className="self-end">
            <StyledIconBtn
              variant="outlined"
              startIcon={<SearchIcon sx={{ height: "24px", width: "24px" }} />}
              onClick={handleFetchData}
            />
          </div>
        </div>

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
