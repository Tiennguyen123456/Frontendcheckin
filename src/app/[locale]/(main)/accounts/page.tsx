"use client";
import AutoComplete from "@/components/common/AutoComplete";
import HeadContent from "@/components/common/HeadContent";
import ConfirmPopover from "@/components/common/Popover";
import Table from "@/components/common/Table";
import Input from "@/components/common/TextField";
import UserModal from "@/components/modal/UserModal";
import { DateTimeFormat, UserStatus } from "@/constants/variables";
import { IAccountRes } from "@/models/api/account-api";
import { IRoleRes } from "@/models/api/authority-api";
import { IDataTable } from "@/models/Table";
import { useAppSelector } from "@/redux/root/hooks";
import { selectUser } from "@/redux/user/slice";
import accountApi from "@/services/account-api";
import authorityApi from "@/services/authority-api";
import {
  StyledActionGroup,
  StyledChip,
  StyledChipTag,
  StyledContentWrapper,
  StyledIconBtn,
  StyledLink,
  StyledPrimaryButton,
} from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import { toastError, toastSuccess } from "@/utils/toast";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CustomIconBtn from "../../../../components/common/Button/CustomIconBtn";
import { getColorTagAccountStatus, getTextAccountStatus } from "../../../../utils/common";

const [ADMIN, SYSTEM_ADMIN] = ["admin", "system-admin"];

const sortKeys = {
  full_name: "fullName",
  email: "email",
};

type Props = {};

interface IAccountDataTable extends IDataTable<IAccountRes> {
  status: any;
  role: any;
}

const AccountsPage = () => {
  const translation = useTranslations();

  const { userProfile } = useAppSelector(selectUser);
  const [roles, setRoles] = useState<IRoleRes[]>([]);
  const [selectedRow, setSelectedRow] = useState<IAccountRes>();

  const [loadingTable, setLoadingTable] = useState(true);
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataTable, setDataTable] = useState<IAccountDataTable>({
    search: "",
    list: [],
    totalItems: 0,
    paginationModel: {
      page: 0,
      pageSize: 20,
    },
    pageSizeOptions: [10, 20, 50, 100],
    sortModel: [],
    rowSelectionModel: [],
    status: {},
    role: {},
  });

  const handleGetRoles = async () => {
    const response = await authorityApi.getRoles();
    setRoles(response.collection);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: translation("accountPage.table.name"),
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StyledLink href={`/dashboard`}>
            <Box sx={{ columnGap: "6px" }}>{row?.name || translation("label.notAvailable")}</Box>
          </StyledLink>
          <Box>{row.id === userProfile?.id && <StyledChipTag label={"It's you"} />}</Box>
        </div>
      ),
    },
    {
      field: "email",
      headerName: translation("accountPage.table.email"),
      minWidth: 250,
      flex: 2,
      renderCell: (params) => <span>{params?.value || translation("label.notAvailable")}</span>,
    },
    {
      field: "role",
      headerName: translation("accountPage.table.role"),
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <span>
          {row?.roles && row.roles.length > 0
            ? row.roles.map((role: string) => role).join(", ")
            : translation("label.notAvailable")}
        </span>
      ),
    },
    {
      field: "created_at",
      headerName: translation("accountPage.table.createdAt"),
      minWidth: 220,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ row }) => (
        <span>
          {dayjs(row.created_at).isValid()
            ? dayjs(row.created_at).format(DateTimeFormat)
            : translation("label.notAvailable")}
        </span>
      ),
    },
    {
      field: "status",
      headerName: translation("accountPage.table.status"),
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <StyledChip
            style={{ width: "70px", textAlign: "center", textTransform: "capitalize" }}
            className={getColorTagAccountStatus(row?.status)}
          >
            {getTextAccountStatus(row.status)}
          </StyledChip>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      minWidth: 120,
      headerAlign: "right",
      align: "right",
      renderCell: ({ row }) => {
        return (
          <>
            {SYSTEM_ADMIN === SYSTEM_ADMIN ? (
              <>
                {row?.roles[0] === SYSTEM_ADMIN ? null : (
                  <StyledActionGroup>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClickEdit(row);
                      }}
                      aria-label="edit"
                    >
                      <EditIcon sx={{ color: themeColors.colors.blue219 }} />
                    </IconButton>
                    <ConfirmPopover
                      id={row.id}
                      onConfirm={handleDeleteUser}
                      mainTitle={"Delete user"}
                      subtitle={"Are you sure you want to delete this user?"}
                      icon={<DeleteIcon sx={{ color: themeColors.colors.redD32, height: "20px", width: "20px" }} />}
                    />
                  </StyledActionGroup>
                )}
              </>
            ) : (
              <>
                {userProfile?.id !== row.id && (row?.roles[0] === ADMIN || row?.roles[0] === SYSTEM_ADMIN) ? null : (
                  <>
                    {userProfile?.id !== row.id && (
                      <StyledActionGroup>
                        <IconButton
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClickEdit(row);
                          }}
                          aria-label="edit"
                        >
                          <EditIcon sx={{ color: themeColors.colors.blue219 }} />
                        </IconButton>
                        <ConfirmPopover
                          id={row.id}
                          onConfirm={handleDeleteUser}
                          mainTitle={"Delete user"}
                          subtitle={"Are you sure you want to delete this user?"}
                          icon={<DeleteIcon sx={{ color: themeColors.colors.redD32, height: "20px", width: "20px" }} />}
                        />
                      </StyledActionGroup>
                    )}
                  </>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];

  const handleTableChange = (name: string, value: any) => {
    setDataTable((prevDataTable) => ({ ...prevDataTable, [name]: value }));
  };

  const handleFetchData = async () => {
    try {
      setLoadingTable(true);
      // const model = generateTableFilters(dataTable);
      let modalSearch: any = {
        page: dataTable.paginationModel.page + 1,
        pageSize: dataTable.paginationModel.pageSize,
      };

      if (dataTable.search) {
        modalSearch["search[]"] = dataTable.search;
      }

      // if (dataTable.enabled?.value !== null && dataTable.enabled?.value !== undefined) {
      //   modalSearch["enabled"] = dataTable.enabled.value;
      // }

      // if (dataTable.role?.value !== null && dataTable.role?.value !== undefined) {
      //   modalSearch["role"] = dataTable.role.value;
      // }

      // if (dataTable.sortModel.length > 0) {
      //   modalSearch["sort"] = sortKeys[dataTable.sortModel?.[0]?.field];
      //   modalSearch["sortType"] = dataTable.sortModel?.[0]?.sort.toUpperCase();
      // }

      const response = await accountApi.getUsersWithParams(modalSearch);

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

  const handleClickEdit = (user: any) => {
    setSelectedRow(user);
    setOpenModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoadingTable(false);
      const response = await accountApi.deleteUser(userId);
      if (response.status === "success") {
        toastSuccess(translation("successApi.DELETE_ACCOUNT_SUCCESS"));
        handleFetchData();
        setLoadingTable(true);
      }
    } catch (error: any) {
      setLoadingTable(false);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.DELETE_ACCOUNT_FAILED"));
      }
    }
  };

  useEffect(() => {
    if (roles?.length === 0) handleGetRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <div className="p-3">
      <HeadContent title={translation("accountPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton startIcon={<AddIcon />} onClick={() => setOpenModal(!isOpenModal)}>
            {translation("action.create")}
          </StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden" onClick={() => setOpenModal(!isOpenModal)}>
          <AddIcon />
        </CustomIconBtn>
      </HeadContent>

      <StyledContentWrapper>
        <div className="flex flex-wrap gap-x-3 gap-y-4 mb-5">
          <div className="w-full md:w-52">
            <Input
              value={dataTable.search}
              fullWidth
              label={translation("label.search")}
              placeholder="Name, Email"
              onChange={(value) => handleTableChange("search", value)}
            />
          </div>
          <div className="w-[calc(50%-6px)] md:w-32">
            <AutoComplete
              label={translation("label.role")}
              value={dataTable.role || null}
              options={[...roles.map((role) => ({ label: role.name, value: role.name }))]}
              onChange={(data) => handleTableChange("role", data)}
            />
          </div>
          <div className="w-[calc(50%-6px)] md:w-32">
            <AutoComplete
              label={translation("label.status")}
              value={dataTable.status || null}
              options={UserStatus}
              onChange={(data) => handleTableChange("status", data)}
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

      {isOpenModal && (
        <UserModal
          show={isOpenModal}
          onClose={() => {
            setSelectedRow(undefined);
            setOpenModal(!isOpenModal);
          }}
          onRefresh={handleFetchData}
          defaultUser={selectedRow}
        />
      )}
    </div>
  );
};

export default AccountsPage;
