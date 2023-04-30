import { useSelector } from "react-redux";
import DataGrid from "../../../components/data-grid/DataGrid";
import DataGridItem from "../../../components/data-grid/data-grid-item/DataGridItem";
import Person from "../../../models/Person";
import { RootState } from "../../../store/Store";
import PersonGridItem from "../../../components/person-grid-item/PersonGridItem";

const DataDetails = () => {
  const data = useSelector((state: RootState) => state.person.data);

  const renderPersonItem = (person: Person, key: number) => (
    <DataGridItem
      title={person.name}
      element={<PersonGridItem person={person} />}
    />
  );

  return <DataGrid data={data} renderItem={renderPersonItem} />;
};

export default DataDetails;
