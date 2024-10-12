import BreadcrumbCom from "../../components/ui/Breadcrumb";
import Title from "../../components/ui/Title";
import ActivityTab from "../../components/activityTab/ActivityTab";
import ActivityCard from "../../components/ui/ActivityCard";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchActivityTheatre } from "../../redux/features/activitytheatreslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ChildrenTheatreType } from "../../types/type";

const Activity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activityTheatre, status, error } = useSelector(
    (state: RootState) => state.activityTheatres
  );

  const { setActivityFilter } = useSelector(
    (state: RootState) => state.activityFilters
  );

  // Bu useEffect sadece ürünler (etkinlikler) filtresi değiştiğinde çağrılacak
  useEffect(() => {
    const theatreToFetch =
      setActivityFilter === "all" ? "" : setActivityFilter.toLowerCase();
    dispatch(fetchActivityTheatre({ category: theatreToFetch }));
  }, [dispatch, setActivityFilter]);

  return (
    <div className="flex flex-col gap-y-3 mt-10">
      <BreadcrumbCom item={location.pathname} />
      <Title text1="Etkinlikler" text2="Oyunlar" />
      <p className="w-full h-1 rounded-lg shadow-md shadow-gray-600 bg-gray-800"></p>
      <div className="flex lg:flex-row flex-col gap-y-10 sm:gap-x-10 gap-x-0">
        <ActivityTab />
        {/* Yüklenme durumu sadece etkinlikler için */}
        {status === "loading" ? (
          <div>Etkinlikler yükleniyor...</div>
        ) : (
          <div className="flex  gap-10 flex-wrap justify-center items-center">
            {activityTheatre.map((item: ChildrenTheatreType) => (
              <ActivityCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
      {/* Hata mesajı sadece etkinlikler için */}
      {status === "failed" && <div>{error}</div>}
    </div>
  );
};

export default Activity;
