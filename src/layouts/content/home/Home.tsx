import moment from "moment";
import PaginationTable from "../../../components/pagination-table/PaginationTable";
import personsJson from "./data.json";
import PaginationTableSelectionCheckbox from "../../../components/pagination-table/selection-checkbox/PaginationTableSelectionCheckbox";
import React from "react";
import styles from "./Home.module.scss";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import buttonThemes from "../../../themes/mui-button-themes";
import Person from "../../../models/Person";

const Home = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = React.useState(
    React.useMemo(() => personsJson, [])
  );

  const tableColumns = [
    {
      id: "select",
      header: (value: any) => (
        <PaginationTableSelectionCheckbox
          checked={value.table.getIsAllPageRowsSelected()}
          indeterminate={value.table.getIsSomePageRowsSelected()}
          onChange={value.table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: (value: any) => (
        <PaginationTableSelectionCheckbox
          checked={value.row.getIsSelected()}
          disabled={!value.row.getCanSelect()}
          indeterminate={value.row.getIsSomeSelected()}
          onChange={value.row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      header: t("table.header.personNumber"),
      accessorKey: "number",
      sticky: "left",
      footer: (props: any) => props.column.id,
      cell: (table: any) => Number(table.cell.row.id) + 1,
    },
    {
      header: t("table.header.personName"),
      accessorKey: "name",
      disableFilters: true,
      sticky: "left",
      footer: (props: any) => props.column.id,
    },
    {
      header: t("table.header.personAge"),
      accessorKey: "age",
      sticky: "left",
      footer: (props: any) => props.column.id,
    },
    {
      header: t("table.header.personBirthDate"),
      accessorKey: "birth_date",
      footer: (props: any) => props.column.id,
      cell: (value: any) => {
        return moment(value.getValue()).format("DD/MM/YYYY");
      },
    },
    {
      header: t("table.header.personBiography"),
      accessorKey: "biography",
      footer: (props: any) => props.column.id,
      cell: (value: any) => {
        return `${value.getValue().slice(0, 250)}...`;
      },
    },
    {
      header: t("table.header.personAction"),
      accessorKey: "action",
      footer: (props: any) => props.column.id,
      cell: (value: any) => {
        return (
          <ThemeProvider theme={buttonThemes}>
            <div className={styles["pagination-table__actions"]}>
              <Button variant="contained" color="darkTurquoise">
                {t("table.action.edit")}
              </Button>
              <Button
                variant="contained"
                color="darkTurquoise"
                onClick={() => deleteRows([value.row.index])}
              >
                {t("table.action.delete")}
              </Button>
            </div>
          </ThemeProvider>
        );
      },
    },
  ];

  function deleteRows(rowsIndex: number[]): void {
    var dataCopy: Person[] = [...tableData];

    const rowsIndexLength = rowsIndex.length;
    if (rowsIndexLength < 0) {
      return;
    }

    if (rowsIndex.length === 1) {
      dataCopy.splice(rowsIndex[0], 1);
    } else {
      dataCopy = dataCopy.filter(
        (row, index) => !rowsIndex.find((rowIndex) => rowIndex === index)
      );
    }

    setTableData(dataCopy);
  }

  return (
    <PaginationTable
      columns={tableColumns}
      data={tableData}
      deleteRows={deleteRows}
    ></PaginationTable>
  );
};

export default Home;
