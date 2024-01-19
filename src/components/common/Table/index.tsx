import theme, { themeColors } from "@/theme/theme";
import styled from "@emotion/styled";
import { DataGrid, GridColDef, GridColumnMenu } from "@mui/x-data-grid";

type Props = {
  dataTable: any;
  columns: GridColDef[];
  onChangeTable: (key: string, value: any) => void;
  loading?: boolean;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  disableColumnFilter?: boolean;
  disableRowSelectionOnClick?: boolean;
  rowHeight?: number;
  keepNonExistentRowsSelected?: boolean;
};

const Table = ({
  dataTable,
  columns,
  onChangeTable,
  loading = false,
  checkboxSelection = true,
  disableSelectionOnClick = false,
  disableColumnFilter = false,
  disableRowSelectionOnClick = true,
  rowHeight = 52,
  keepNonExistentRowsSelected = false,
}: Props) => {
  function CustomColumnMenu(props: any) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          columnMenuColumnsItem: null,
        }}
      />
    );
  }

  return (
    <StyledTableWrapper id="table">
      <StyledTableDataGrid
        keepNonExistentRowsSelected={keepNonExistentRowsSelected}
        slots={{
          columnMenu: CustomColumnMenu,
        }}
        rows={loading ? [] : [...dataTable.list]}
        columns={columns}
        rowCount={dataTable.totalItems}
        sortModel={dataTable.sortModel}
        paginationModel={dataTable.paginationModel}
        paginationMode="server"
        sortingMode="server"
        pageSizeOptions={dataTable.pageSizeOptions}
        checkboxSelection={checkboxSelection}
        rowSelectionModel={disableSelectionOnClick ? [] : dataTable.rowSelectionModel}
        disableColumnFilter={disableColumnFilter}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        rowHeight={rowHeight}
        onPaginationModelChange={(data) => {
          if (dataTable.paginationModel.pageSize !== data.pageSize) {
            onChangeTable("paginationModel", {
              page: 0,
              pageSize: data.pageSize,
            });
          } else {
            onChangeTable("paginationModel", data);
          }
        }}
        onSortModelChange={(data) => {
          onChangeTable("paginationModel", {
            page: 0,
            pageSize: 10,
          });
          onChangeTable("sortModel", data);
        }}
        onRowSelectionModelChange={
          disableSelectionOnClick
            ? () => {}
            : (data) => {
                onChangeTable("rowSelectionModel", data);
              }
        }
        loading={loading}
      />
    </StyledTableWrapper>
  );
};

export default Table;

// Styled
const StyledTableDataGrid = styled(DataGrid)`
  border: 0;
  background-color: ${themeColors.colors.whiteFFF};
  height: auto;

  .MuiCheckbox-root.Mui-checked {
    color: ${themeColors.colors.blue219};
  }
  .MuiDataGrid-columnHeader {
    outline: none !important;
    &--moving {
      background-color: ${themeColors.colors.whiteFFF};
    }
  }
  .MuiDataGrid-columnHeaderTitle {
    font-weight: 600;
  }
  .MuiDataGrid-footerContainer {
    .MuiTablePagination-root {
      margin-top: 8px;
    }
    .MuiTablePagination-selectLabel {
      font-size: 12px;
      line-height: 166%;
      letter-spacing: 0.4px;
      color: ${themeColors.colors.blackRgba60};

      margin: 0;
    }
    .MuiSelect-select {
      font-size: 12px;
      line-height: 166%;
      letter-spacing: 0.4px;
    }
    .MuiTablePagination-displayedRows {
      font-size: 12px;
      line-height: 166%;
      letter-spacing: 0.4px;
      margin: 0;
    }
  }
  .MuiDataGrid-overlayWrapper {
    min-height: 300px;
  }
  .MuiDataGrid-virtualScrollerContent {
    min-height: auto !important;
  }
`;
const StyledTableWrapper = styled.div`
  width: 100%;
`;
