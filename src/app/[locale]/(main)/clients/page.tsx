"use client";
import { ACTION } from "@/constants/enum";
import eventApi from "@/services/event-api";
import { toastError, toastSuccess } from "@/utils/toast";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Badge, IconButton } from "@mui/material";
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
import { DateFormat, DateTimeFormat, EventStatusOptions } from "../../../../constants/variables";
import useCustomRouter from "../../../../hooks/useCustomRouter";
import { IDataTable } from "../../../../models/Table";
import {
  StyledActionGroup,
  StyledChip,
  StyledChipTag,
  StyledContentWrapper,
  StyledIconBtn,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../../../styles/commons";
import { themeColors } from "../../../../theme/theme";
import { getColorTagEventStatus, getTextEventStatus } from "../../../../utils/common";
import styled from "@emotion/styled";

type Props = {};

type ClientRowType = {
  id: number;
  scanTime: string;
  name: string;
  qrCode: string;
  email: string;
  phone: string;
  type: string;
  status: string;
};

const rows: ClientRowType[] = [
  {
    id: 1,
    scanTime: "20230101195734",
    name: "Hoang",
    qrCode: "BIDV event",
    email: "hoang21062001@gmail.com",
    phone: "0334773288",
    type: "LANDING_PAGE",
    status: "NEW",
  },
  {
    id: 2,
    scanTime: "20230101195734",
    name: "John Doe",
    qrCode: "XYZ Conference",
    email: "john.doe@example.com",
    phone: "5551234567",
    type: "CONFERENCE",
    status: "ACTIVE",
  },
  {
    id: 3,
    scanTime: "20230101195734",
    name: "Alice Smith",
    qrCode: "Tech Expo",
    email: "alice.smith@example.com",
    phone: "5559876543",
    type: "EXPO",
    status: "ACTIVE",
  },
  {
    id: 4,
    scanTime: "20230101195734",
    name: "Bob Johnson",
    qrCode: "Product Launch",
    email: "bob.johnson@example.com",
    phone: "5557890123",
    type: "ACTIVE",
    status: "NEW",
  },
  {
    id: 5,
    scanTime: "20230101195734",
    name: "Eva Davis",
    qrCode: "Marketing Workshop",
    email: "eva.davis@example.com",
    phone: "5554567890",
    type: "WORKSHOP",
    status: "ACTIVE",
  },
];

interface IClientDataTable extends IDataTable<ClientRowType> {
  status: any;
}

const EventsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Custom Hook
  const routerPushWithLocale = useCustomRouter();

  // ** State
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState<IClientDataTable>({
    search: "",
    list: rows,
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
      field: "scanTime",
      headerName: translation("clientsPage.table.scanTime"),
      sortable: false,
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => (
        <span>
          {dayjs(row.scanTime).isValid()
            ? dayjs(row.scanTime).format(DateTimeFormat)
            : translation("label.notAvailable")}
        </span>
      ),
    },
    {
      field: "name",
      headerName: translation("clientsPage.table.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "qrCode",
      headerName: translation("clientsPage.table.qrCode"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: translation("clientsPage.table.email"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "phone",
      headerName: translation("clientsPage.table.phone"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "type",
      headerName: translation("clientsPage.table.type"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: translation("clientsPage.table.status"),
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
      field: "action",
      headerName: "",
      minWidth: 200,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: ({ row }) => (
        <StyledActionGroup>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleClickEdit(row.id)}>
            <EditIcon sx={{ color: themeColors.colors.blue219 }} />
          </IconButton>
          <ConfirmPopover
            id={row?.name}
            onConfirm={() => {}}
            mainTitle={translation("checkInPopover.title")}
            subtitle={translation("checkInPopover.description") + `${row.name} ?`}
            icon={<CheckCircleOutlineIcon className="text-[#2DCE89]" />}
            color={"#2DCE89"}
            buttonTitle={ACTION.Approve}
          />
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

      // const response = await eventApi.getEventsWithParams(modalSearch);
      // if (response.status === "success") {
      //   setDataTable((preValue) => ({
      //     ...preValue,
      //     list: response.data.collection,
      //     totalItems: response.data.pagination.meta.total,
      //   }));
      // }
      setLoadingTable(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClickAddEvent = () => {
    // routerPushWithLocale(ROUTES.EVENT_CREATE);
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
      <HeadContent title={translation("clientsPage.title")}>
        <div className="hidden md:grid grid-rows-2 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <StyledPrimaryButton size="small" startIcon={<HomeIcon />} onClick={() => {}} className="text-sm">
              {translation("action.landingPage")}
            </StyledPrimaryButton>
            <StyledSecondaryButton
              size="small"
              startIcon={<RecentActorsIcon />}
              sx={{ color: themeColors.colors.gray5C6 }}
            >
              {translation("action.listCard")}
            </StyledSecondaryButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StyledSecondaryButton
              size="small"
              startIcon={<FileUploadIcon />}
              sx={{ color: themeColors.colors.gray5C6 }}
            >
              {translation("action.importExcel")}
            </StyledSecondaryButton>
            <StyledSecondaryButton
              size="small"
              startIcon={<FileDownloadIcon />}
              sx={{ color: themeColors.colors.gray5C6 }}
            >
              {translation("action.exportExcel")}
            </StyledSecondaryButton>{" "}
          </div>
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
        <div className="flex flex-wrap justify-between items-center">
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
          <div>
            <StyledSecondaryButton size="small" startIcon={<DeleteIcon />} sx={{ color: themeColors.colors.redD32 }}>
              {translation("action.delete")}
            </StyledSecondaryButton>
          </div>
        </div>
        <div className="flex mb-5 mt-2 items-center">
          <StyledBadge badgeContent={4}>{translation("label.allClients")}</StyledBadge>
          <div className="w-3 h-[1px] bg-gray-500 ml-6 mr-4"></div>
          <StyledBadge badgeContent={4}>{translation("label.checkInAvailable")}</StyledBadge>
          <div className="w-3 h-[1px] bg-gray-500 ml-6 mr-4"></div>
          <StyledBadge badgeContent={4}>{translation("label.notCheckIn")}</StyledBadge>
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

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    right: -10px;
    color: white;
    background-color: #ff4d4f;
  }
`;
