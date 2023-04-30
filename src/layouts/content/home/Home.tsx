import PaginationTable from "../../../components/pagination-table/PaginationTable";
import PaginationTableSelectionCheckbox from "../../../components/pagination-table/selection-checkbox/PaginationTableSelectionCheckbox";
import styles from "./Home.module.scss";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import buttonThemes from "../../../themes/mui-button-themes";
import PersonForm from "../../../components/pagination-table/person-form/PersonForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { deletePerson } from "../../../reducers/PersonReducer";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.person.data);
  const [t] = useTranslation();

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
    },
    {
      header: t("table.header.personBiography"),
      accessorKey: "biography",
      footer: (props: any) => props.column.id,
      cell: (value: any) => {
        const biography = value.getValue();

        if (!biography) {
          return "–";
        }

        return biography;
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
                onClick={() => dispatch(deletePerson([value.row.index]))}
              >
                {t("table.action.delete")}
              </Button>
            </div>
          </ThemeProvider>
        );
      },
    },
  ];

  return (
    <ThemeProvider theme={buttonThemes}>
      <PaginationTable
        columns={tableColumns}
        data={tableData}
      ></PaginationTable>
      <PersonForm></PersonForm>
    </ThemeProvider>
  );
};

export default Home;
