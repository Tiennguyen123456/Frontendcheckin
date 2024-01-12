"use client";
import AutoComplete from "@/components/common/AutoComplete";
import HeadContent from "@/components/common/HeadContent";
import Table from "@/components/common/Table";
import Input from "@/components/common/TextField";
import { DateTimeFormat } from "@/constants/variables";
import { IAccountRes } from "@/models/api/account-api";
import { IDataTable, IListRes } from "@/models/Table";
import accountApi from "@/services/account-api";
// import { getListRoles } from "@/redux/accounts/actions";
// import { deleteUserService, getAdminMemberListService } from "@/services/account";
import {
  StyledActionGroup,
  StyledChip,
  StyledChipTag,
  StyledContentWrapper,
  StyledIconBtn,
  StyledLink,
  StyledPageContent,
  StyledPrimaryButton,
} from "@/styles/commons";
import { toastError, toastSuccess } from "@/utils/toast";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/redux/root/hooks";
import { selectUser } from "@/redux/user/slice";
import authorityApi from "@/services/authority-api";
import { IRoleRes } from "@/models/api/authority-api";
import ConfirmPopover from "@/components/common/Popover";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { themeColors } from "@/theme/theme";
import UserModal from "@/components/modal/UserModal";

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
  const router = useRouter();
  const translation = useTranslations();

  const { userProfile } = useAppSelector(selectUser);
  const [roles, setRoles] = useState<IRoleRes[]>([]);

  const [loadingTable, setLoadingTable] = useState(true);
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataEditing, setDataEditing] = useState();
  const [dataTable, setDataTable] = useState<IAccountDataTable>({
    search: "",
    list: [],
    totalItems: 0,
    paginationModel: {
      page: 0,
      paginate: 20,
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
          <StyledChip style={{ width: "70px", textAlign: "center" }} className={row.status ? "active" : ""}>
            {row.status === "ACTIVE" ? "Active" : "New"}
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
                        handleClickEdit(row.id);
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
                            handleClickEdit(row.id);
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
      const modalSearch = {
        page: dataTable.paginationModel.page + 1,
        pageSize: dataTable.paginationModel.paginate,
      };

      // if (dataTable.search) {
      //   modalSearch["search"] = dataTable.search;
      // }

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

  const handleClickEdit = (userId: number) => {
    router.push(`/configurations/users/user-details/${userId}?content=details`);
  };

  const handleDeleteUser = async (userId: number) => {};

  useEffect(() => {
    if (roles?.length === 0) handleGetRoles();
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <StyledPageContent>
      <HeadContent hasBackBtn title={translation("accountPage.title")}>
        <StyledPrimaryButton startIcon={<AddIcon />} onClick={() => setOpenModal(!isOpenModal)}>
          {translation("action.create")}
        </StyledPrimaryButton>
      </HeadContent>
      <StyledContentWrapper>
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Grid item container xs={8} gap={2} alignItems="center">
            <Grid item xs={4}>
              <Input
                value={dataTable.search}
                fullWidth
                label={translation("label.search")}
                placeholder="Name, Email"
                onChange={(value) => handleTableChange("search", value)}
              />
            </Grid>
            <Grid item xs={3}>
              <AutoComplete
                label={translation("label.role")}
                value={dataTable.role || null}
                options={[...roles.map((role) => ({ label: role.name, value: role.name }))]}
                onChange={(data) => handleTableChange("role", data)}
              />
            </Grid>
            <Grid item xs={2.5}>
              <AutoComplete
                label={translation("label.status")}
                value={dataTable.status || null}
                options={[
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "NEW", value: "NEW" },
                ]}
                onChange={(data) => handleTableChange("status", data)}
              />
            </Grid>
            <Grid item xs={1}>
              <StyledIconBtn
                variant="outlined"
                startIcon={<SearchIcon sx={{ height: "24px", width: "24px" }} />}
                onClick={handleFetchData}
              />
            </Grid>
          </Grid>
        </Grid2>

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
          dataEditing={dataEditing}
          onClose={() => {
            // setDataEditing();
            setOpenModal(!isOpenModal);
          }}
          onRefresh={handleFetchData}
        />
      )}
    </StyledPageContent>
  );
};

export default AccountsPage;
