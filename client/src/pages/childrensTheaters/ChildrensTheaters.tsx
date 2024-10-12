import BreadcrumbCom from "../../components/ui/Breadcrumb";
import Title from "../../components/ui/Title";
import Banner from "../../components/banner/Banner";
import { images } from "../../assets/images/assets";
import ChildrenCard from "../../components/ui/ChildrenCard";
import { fetchChildrenTheatre } from "../../redux/features/childrentheatreslice";
import { RootState, AppDispatch } from "../../redux/store";
import { ChildrenTheatreType } from "../../types/type";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/search/Search";

const ChildrensTheaters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { childrenTheatre, status, error } = useSelector(
    (state: RootState) => state.childrenTheatres
  );

  const [search, setSearch] = useState("");
  const [filteredTheatre, setFilteredTheatre] = useState<ChildrenTheatreType[]>(
    []
  );

  useEffect(() => {
    // İlk yükleme sırasında tüm tiyatroları getir
    dispatch(fetchChildrenTheatre());
  }, [dispatch]);

  useEffect(() => {
    // Search input değiştikçe filtreleme yap
    if (search) {
      const filtered = childrenTheatre.filter((item: ChildrenTheatreType) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTheatre(filtered);
    } else {
      setFilteredTheatre(childrenTheatre);
    }
  }, [search, childrenTheatre]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-10 flex flex-col gap-y-10">
      <BreadcrumbCom item={location.pathname} />
      <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-5 items-center justify-between">
        <Title text1="Çocuk" text2="Tiyatroları" />
        <Search
          placeholder="Çocuk Tiyatrosu Ara..."
          search={search}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <p className="w-full h-1 rounded-lg shadow-md shadow-gray-600 bg-gray-800"></p>
      <Banner image={images.banner1} />
      <ul className="flex gap-10 flex-wrap items-center justify-center">
        {filteredTheatre.length > 0 ? (
          filteredTheatre.map((item: ChildrenTheatreType) => (
            <ChildrenCard key={item._id} item={item} />
          ))
        ) : (
          <p>Aramanıza uygun tiyatro bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default ChildrensTheaters;
