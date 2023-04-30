import styles from "./DataGrid.module.scss";
import { splitArray } from "../../utils/array-utils/ArrayUtils";

interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T, key: number) => JSX.Element;
}

const itemsInRow = 4;

function DataGrid<T>({ data, renderItem }: DataGridProps<T>) {
  const splittedData = splitArray(data, itemsInRow);

  return (
    <>
      <h1 className={`${styles["data-grid-title"]}`}>Lista osób</h1>
      <div className={`${styles["data-grid"]}`}>
        {splittedData.map(
          (rows, rowIndex) => {
            console.log(rows);
            return (
              <div key={rowIndex} className={`${styles["data-grid__row"]}`}>
                {rows.map((item, index) => renderItem(item, index))}
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default DataGrid;
