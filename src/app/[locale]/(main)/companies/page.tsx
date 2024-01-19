"use client";
import AutoComplete from "@/components/common/AutoComplete";
import HeadContent from "@/components/common/HeadContent";
import ConfirmPopover from "@/components/common/Popover";
import Table from "@/components/common/Table";
import Input from "@/components/common/TextField";
import { ROUTES } from "@/constants/routes";
import { DateTimeFormat, UserStatus } from "@/constants/variables";
import useCustomRouter from "@/hooks/useCustomRouter";
import { ICompanyRes } from "@/models/api/company-api";
import { IDataTable } from "@/models/Table";
import companyApi from "@/services/company-api";
import {
  StyledActionGroup,
  StyledChip,
  StyledContentWrapper,
  StyledIconBtn,
  StyledPrimaryButton,
} from "@/styles/commons";
import { themeColors } from "@/theme/theme";
import { toastError, toastSuccess } from "@/utils/toast";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CustomIconBtn from "../../../../components/common/Button/CustomIconBtn";
import { getColorTagAccountStatus, getTextCompanyStatus } from "../../../../utils/common";

type Props = {};

interface ICompanyDataTable extends IDataTable<ICompanyRes> {
  status: any;
}

const CompaniesPage = (props: Props) => {
  const translation = useTranslations();
  const routerPushWithLocale = useCustomRouter();
  const [loadingTable, setLoadingTable] = useState(true);
  const [dataTable, setDataTable] = useState<ICompanyDataTable>({
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
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: translation("companyPage.table.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "website",
      headerName: translation("companyPage.table.website"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "contact_email",
      headerName: translation("companyPage.table.email"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "address",
      headerName: translation("companyPage.table.address"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "contact_phone",
      headerName: translation("companyPage.table.phone"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "update_at",
      headerName: translation("companyPage.table.updateAt"),
      minWidth: 220,
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <span>
          {dayjs(row.update_at).isValid()
            ? dayjs(row.update_at).format(DateTimeFormat)
            : translation("label.notAvailable")}
        </span>
      ),
    },
    {
      field: "status",
      headerName: translation("companyPage.table.status"),
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
            {getTextCompanyStatus(row.status)}
          </StyledChip>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      minWidth: 100,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: ({ row }) => (
        <StyledActionGroup>
          <IconButton aria-label="edit" onClick={() => handleClickEdit(row.id)}>
            <EditIcon sx={{ color: themeColors.colors.blue219 }} />
          </IconButton>
          <ConfirmPopover
            id={row?.name}
            onConfirm={() => handleClickDelete(row.id)}
            mainTitle={translation("deletePopover.titleCompany")}
            subtitle={translation("deletePopover.description")}
            icon={<DeleteIcon sx={{ color: themeColors.colors.redD32, height: "20px", width: "20px" }} />}
          />
        </StyledActionGroup>
      ),
    },
  ];

  const handleTableChange = (name: string, value: any) => {
    setDataTable((prevDataTable) => ({ ...prevDataTable, [name]: value }));
  };

  const handleClickEdit = (companyId: number) => {
    routerPushWithLocale(ROUTES.COMPANY_DETAILS + `/${companyId}`);
  };

  const handleClickAddEvent = () => {
    routerPushWithLocale(ROUTES.COMPANY_CREATE);
  };

  const handleClickDelete = async (companyId: number) => {
    try {
      setLoadingTable(false);
      const response = await companyApi.deleteCompany(companyId);
      if (response.status === "success") {
        toastSuccess(translation("successApi.DELETE_COMPANY_SUCCESS"));
        handleFetchData();
        setLoadingTable(true);
      }
    } catch (error: any) {
      setLoadingTable(false);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.DELETE_COMPANY_FAILED"));
      }
    }
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

      const response = await companyApi.getCompaniesWithParams(modalSearch);

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

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable.paginationModel, dataTable.sortModel]);

  return (
    <div className="p-3">
      <HeadContent title={translation("companyPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton startIcon={<AddIcon />} onClick={handleClickAddEvent}>
            {translation("action.create")}
          </StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden" onClick={handleClickAddEvent}>
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
    </div>
  );
};

export default CompaniesPage;
