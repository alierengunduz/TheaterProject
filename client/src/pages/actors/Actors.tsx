import ActorCard from "../../components/ui/ActorCard";
import BreadcrumbCom from "../../components/ui/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { ChildrenTheatreType } from "../../types/type";
import { getAllActor } from "../../redux/features/actorslice";
import Search from "../../components/search/Search";

const Actors = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { actor, status, error } = useSelector(
    (state: RootState) => state.actors
  );
  const [search, setSearch] = useState("");
  const [filteredTheatre, setFilteredTheatre] = useState<ChildrenTheatreType[]>(
    []
  );

  useEffect(() => {
    dispatch(getAllActor());
  }, [dispatch]);

  useEffect(() => {
    // Search input değiştikçe filtreleme yap
    if (search) {
      const filtered = actor.filter((item: ChildrenTheatreType) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTheatre(filtered);
    } else {
      setFilteredTheatre(actor);
    }
  }, [search, actor]);

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
      <div className="flex sm:items-start items-center sm:justify-start justify-center">
        <Search
          placeholder="Sanatçı Ara..."
          search={search}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <ul className="gap-5 flex flex-wrap sm:items-start items-center sm:justify-start justify-center">
        {filteredTheatre.length > 0 ? (
          filteredTheatre.map((item: ChildrenTheatreType) => (
            <ActorCard key={item._id} item={item} />
          ))
        ) : (
          <p>Aramanıza uygun tiyatro bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default Actors;
