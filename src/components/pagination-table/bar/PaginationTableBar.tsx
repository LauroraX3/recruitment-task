import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import Button from "@mui/material/Button";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import styles from "./PaginationTableBar.module.scss";
import { useTranslation } from "react-i18next";
import Person from "../../../models/Person";

interface PaginationTableBarProps {
  table: Table<Person>;
}

const PaginationTableBar = ({ table }: PaginationTableBarProps) => {
  const [t] = useTranslation();
  const [pageNumber, setPageNumber] = useState(-1);
  const pageIndex = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  var buttonPageStart;
  var buttonPageEnd;

  if (pageIndex <= 3) {
    buttonPageStart = 1;
    buttonPageEnd = Math.min(5, totalPages);
  } else if (pageIndex >= totalPages - 2) {
    buttonPageStart = Math.max(1, totalPages - 4);
    buttonPageEnd = totalPages;
  } else {
    buttonPageStart = pageIndex - 2;
    buttonPageEnd = pageIndex + 2;
  }

  const buttonsPage = [];

  for (let i = buttonPageStart; i <= buttonPageEnd; i++) {
    buttonsPage.push(
      <Button key={i} onClick={() => table.setPageIndex(i - 1)}>
        <p className={`${styles["button-page"]}`}>{`${i}`}</p>
      </Button>
    );
  }

  return (
    <div className={`${styles["pagination-bar"]}`}>
      <IconButton
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <MdOutlineKeyboardDoubleArrowLeft
          className={`${styles["pagination-bar__icon--multiple"]}`}
        />
      </IconButton>

      <IconButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <MdArrowBackIosNew className={`${styles["pagination-bar__icon--single"]}`} />
      </IconButton>

      {buttonsPage}
      <IconButton
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <MdArrowForwardIos className={`${styles["pagination-bar__icon--single"]}`} />
      </IconButton>
      <IconButton
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <MdOutlineKeyboardDoubleArrowRight
          className={`${styles["pagination-bar__icon--multiple"]}`}
        />
      </IconButton>
      <TextField
        className={`${styles["pagination-bar__jump--to-input"]}`}
        type="number"
        variant="outlined"
        label={t("table.bar.jumpToPage")}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setPageNumber(Number(e.target.value))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => {
                  if (pageNumber < 0) {
                    table.setPageIndex(0);
                  } else if (pageNumber > table.getPageCount()) {
                    table.setPageIndex(table.getPageCount() - 1);
                  } else {
                    table.setPageIndex(pageNumber - 1);
                  }
                }}
              >
                <MdArrowForwardIos className={`${styles["icon"]}`} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default PaginationTableBar;
