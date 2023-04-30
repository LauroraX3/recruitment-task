import React from "react";
import styles from "./DataGridItem.module.scss";

interface DataGridItemProps {
  title: string;
  element: JSX.Element;
}

const DataGridItem = ({ title, element }: DataGridItemProps) => {
  return (
    <div className={`${styles["grid-item"]}`}>
      <h3 className={`${styles["grid-item__title"]}`}>{title}</h3>
      {element}
    </div>
  );
};

export default DataGridItem;
