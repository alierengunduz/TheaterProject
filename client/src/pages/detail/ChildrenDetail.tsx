import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchChildrenById } from "../../redux/features/childrentheatreslice";
import ChildrenDetailLeft from "../../components/childrenDetail/ChildrenDetailLeft";
import ChildrenDetailRight from "../../components/childrenDetail/ChildrenDetailRight";
import ChildrenDetailContect from "../../components/childrenDetail/ChildrenDetailContect";
const ChildrenDetail = () => {
  const { childrenId } = useParams<{ childrenId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (childrenId) {
      dispatch(fetchChildrenById(childrenId));
    }
  }, [dispatch, childrenId]);

  return (
    <div className="flex flex-col  gap-y-10 mt-10 w-full">
      <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-10 gap-x-10">
        <div className="lg:w-1/3 w-full">
          <ChildrenDetailLeft />
        </div>
        <div className="ld:w-2/3 w-full">
          <ChildrenDetailRight />
        </div>
      </div>
      <div>
        <ChildrenDetailContect />
      </div>
    </div>
  );
};

export default ChildrenDetail;
