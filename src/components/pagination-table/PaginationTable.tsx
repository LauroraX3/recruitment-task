import React from "react";
import Select from "react-select";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "./PaginationTable.module.scss";
import Button from "@mui/material/Button";
import PaginationTableSelectionCheckbox from "./selection-checkbox/PaginationTableSelectionCheckbox";
import PaginationTableBar from "./bar/PaginationTableBar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import buttonThemes from "../../themes/mui-button-themes";
import Person from "../../models/Person";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { deletePerson } from "../../reducers/PersonReducer";

interface PaginationTableProps {
  columns: any;
  data: Person[];
}

const PaginationTable = ({ columns, data }: PaginationTableProps) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const dispatch: AppDispatch = useDispatch();
  const [ t ] = useTranslation();

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectNumberOfPeopleOnPageOptions = [
    {
      value: 10,
      label: t("table.selectNumberOfPeopleOnPage", { number: "10" }),
    },
    {
      value: 20,
      label: t("table.selectNumberOfPeopleOnPage", { number: "20" }),
    },
    {
      value: 50,
      label: t("table.selectNumberOfPeopleOnPage", { number: "20" }),
    },
  ];

  return (
    <div className={`${styles["pagination-table"]}`}>
      <Select
        className={`${styles["pagination-table__data__number__selector"]}`}
        classNamePrefix="pagination-table__data__number__selector"
        defaultValue={selectNumberOfPeopleOnPageOptions[0]}
        value={{
          value: table.getState().pagination.pageSize,
          label: t("table.selectNumberOfPeopleOnPage", {
            number: `${table.getState().pagination.pageSize}`,
          }),
        }}
        onChange={(e) => {
          table.setPageSize(Number(e?.value));
        }}
        name="people-page-number-select"
        options={selectNumberOfPeopleOnPageOptions}
      ></Select>

      <table className={`${styles["pagination-table__table"]}`}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={`${styles["pagination-table__table--header-cell"]}`}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <tr
                className={
                  i % 2 === 0
                    ? `${styles["pagination-table__row-even"]}`
                    : `${styles["pagination-table__row-odd"]}`
                }
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className={`${
                        styles[
                          `pagination-table__cell--${cell.column.id.replace(
                            "_",
                            "-"
                          )}`
                        ]
                      }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className={`${styles["pagination-table__footer"]}`}>
          <tr>
            <td className={`${styles["pagination-table__footer--cell-left"]}`}>
              <PaginationTableSelectionCheckbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
              />
            </td>
            <td
              className={`${styles["pagination-table__footer--cell-right"]}`}
              colSpan={20}
            >
              <div className={`${styles["pagination-table__footer--actions"]}`}>
                <p>
                  {t("table.footer.selectedRows", {
                    rowsNumber: Object.keys(rowSelection).length,
                  })}
                </p>
                <Button
                  variant="contained"
                  color="darkTurquoise"
                  onClick={() => {
                    dispatch(deletePerson((Object.keys(rowSelection).map(Number))))
                    setRowSelection({});
                  }}
                >
                  {t("table.action.delete")}
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <PaginationTableBar table={table}></PaginationTableBar>
    </div>
  );
};

export default PaginationTable;
