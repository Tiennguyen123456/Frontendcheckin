"use client";
import RoleModal from "@/components/modal/RoleModal";
import { IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AutoComplete from "../../../../components/common/AutoComplete";
import HeadContent from "../../../../components/common/HeadContent";
import ConfirmPopover from "../../../../components/common/Popover";
import Table from "../../../../components/common/Table";
import Input from "../../../../components/common/TextField";
import { IDataTable } from "../../../../models/Table";
import {
  StyledActionGroup,
  StyledChip,
  StyledContentWrapper,
  StyledIconBtn,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "../../../../styles/commons";
import { themeColors } from "../../../../theme/theme";
import { toastError } from "../../../../utils/toast";
import CustomIconBtn from "../../../../components/common/Button/CustomIconBtn";
import { RoleStatus } from "../../../../constants/variables";

type Props = {};

interface IRoleDataTable extends IDataTable<IRoleRes> {
  enable: any;
}

const RolesPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** State
  const [showRoleModal, setShowRoleModel] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IRoleRes>();
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
    enable: {},
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: translation("rolesPage.table.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "guard_name",
      headerName: translation("rolesPage.table.guardName"),
      sortable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "enable",
      headerName: translation("rolesPage.table.status"),
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return <StyledChip className={params.value ? "active" : ""}>{params.value ? "Active" : "Inactive"}</StyledChip>;
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
          <IconButton aria-label="edit" onClick={() => handleEditRole(row)}>
            <EditIcon sx={{ color: themeColors.colors.blue219 }} />
          </IconButton>
          <ConfirmPopover
            id={row?.name}
            onConfirm={() => {}}
            mainTitle={translation("deletePopover.title")}
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

  const handleFetchData = async () => {
    try {
      setLoadingTable(true);

      let modalSearch: any = {
        page: dataTable.paginationModel.page + 1,
        paginate: dataTable.paginationModel.pageSize,
      };

      // if (dataTable.search) {
      //   modalSearch["search"] = dataTable.search;
      // }

      // if (dataTable.enabled?.value !== null && dataTable.enabled?.value !== undefined) {
      //   modalSearch["enabled"] = dataTable.enabled.value;
      // }

      // if (dataTable.sortModel.length > 0) {
      //   modalSearch["orderByColumn"] = sortKeys[dataTable.sortModel?.[0]?.field];
      //   modalSearch["orderByDesc"] = dataTable.sortModel?.[0]?.sort.toUpperCase();
      // }

      const response = await authorityApi.getRolesWithParams(modalSearch);
      if (response) {
        setDataTable({
          ...dataTable,
          list: response?.collection,
          totalItems: response?.pagination?.meta?.total,
        });
        setLoadingTable(false);
      }
    } catch (error: any) {
      setLoadingTable(false);
      console.log("error: ", error);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.GET_LIST_ROLE_FAILED"));
      }
    }
  };

  const handleEditRole = (role: any) => {
    setSelectedRow(role);
    handleShowRoleModal();
  };

  const handleShowRoleModal = () => {
    setShowRoleModel(true);
  };

  const handleCloseRowModal = () => {
    setSelectedRow(undefined);
    setShowRoleModel(false);
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <div className="p-3">
      <HeadContent title={translation("rolesPage.title")}>
        <div className="hidden md:flex gap-x-3">
          <StyledPrimaryButton size="small" startIcon={<AddIcon />} onClick={handleShowRoleModal}>
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
          <CustomIconBtn onClick={handleShowRoleModal}>
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
              value={dataTable.enable}
              options={RoleStatus}
              onChange={(data) => handleTableChange("enable", data)}
            />
          </div>
          <div className="self-end">
            <StyledIconBtn
              variant="outlined"
              startIcon={<SearchIcon sx={{ height: "24px", width: "24px" }} />}
              onClick={handleFetchData}
            ></StyledIconBtn>
          </div>
        </div>

        <Table
          dataTable={dataTable}
          columns={columns}
          checkboxSelection
          onChangeTable={handleTableChange}
          loading={loadingTable}
        />

        <RoleModal
          show={showRoleModal}
          onClose={handleCloseRowModal}
          onRefetch={handleFetchData}
          defaultRole={selectedRow}
        />
      </StyledContentWrapper>
    </div>
  );
};

export default RolesPage;
