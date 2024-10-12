import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { ChildrenTheatreType } from "../../types/type";
import {
  setTheaterFilter,
  fetchTheatreFilter,
} from "../../redux/features/theaterfilterslice";

const RadioFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    theaterFilter,
    status,
    error,
    setTheaterFilter: selectedFilter,
  } = useSelector((state: RootState) => state.theaterFilters);

  useEffect(() => {
    dispatch(fetchTheatreFilter());
  }, [dispatch]);

  const onChange = (e: RadioChangeEvent) => {
    const selectedFilterId = e.target.value;
    dispatch(setTheaterFilter(selectedFilterId));
  };

  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className="md:w-1/5 w-full flex md:flex-col flex-row gap-y-6 border-r border-dashed">
      <div className="flex flex-col gap-y-3">
        <h3 className="font-bold">Tiyatro & Dans & Konser</h3>
        <div>
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            onChange={onChange}
            value={selectedFilter}
          >
            <Radio
              defaultChecked // Varsayılan olarak seçili olanı belirtir
              value="all"
              className="text-gray-500"
            >
              Hepsi
            </Radio>
            {theaterFilter.map((theatre: ChildrenTheatreType) => (
              <div key={theatre._id}>
                <Radio value={theatre._id} className="text-gray-500">
                  {theatre.name}
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default RadioFilter;
