import { useLocation } from "react-router-dom";
import BreadcrumbCom from "../../components/ui/Breadcrumb";
import DateFilter from "../../components/dateFilter/DateFilter";
import RadioFilter from "../../components/radioFilter/RadioFilter";
import TheatreContent from "../../components/theatreContent/TheatreContent";
const Theatre = () => {
  const location = useLocation();

  return (
    <div className="mt-10 flex flex-col gap-y-10 p-2">
      <div className="flex items-center justify-between">
        <BreadcrumbCom item={location.pathname} />
        <DateFilter />
      </div>
      <div className="flex lg:flex-row flex-col sm:gap-y-0 gap-y-10 gap-x-5  w-full">
        <RadioFilter />
        <TheatreContent />
      </div>
    </div>
  );
};

export default Theatre;
