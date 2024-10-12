import { Select } from "antd";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setSortOrder } from "../../redux/features/theaterslice";

const DateFilter = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: string) => {
    dispatch(setSortOrder(value));
  };

  return (
    <Select
      defaultValue="date"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "date", label: "Tarihe Göre" },
        { value: "alphabet", label: "Alfabetik" },
      ]}
    />
  );
};

export default DateFilter;
