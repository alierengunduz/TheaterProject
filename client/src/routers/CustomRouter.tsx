import HomePage from "../pages/home/HomePage";
import ActorsPage from "../pages/actors/Actors";
import ChildrensTheaters from "../pages/childrensTheaters/ChildrensTheaters";
import Theaters from "../pages/theatre/Theatre";
import Activity from "../pages/activity/Activity";
import TheaterDetail from "../pages/detail/TheaterDetail";
import ChildrenDetail from "../pages/detail/ChildrenDetail";
import ActivityDetail from "../pages/detail/ActivityDetail";
import ActorDetail from "../pages/detail/ActorDetail";
import TheatreAdminPage from "../pages/admin/theatre/TheatreAdminPage";
import TheatreAdminCreatePage from "../pages/admin/theatre/TheatreAdminCreatePage";
import ActivityAdminPage from "../pages/admin/activity/ActivityAdminPage";
import ActivityAdminCreatePage from "../pages/admin/activity/ActivityAdminCreatePage";
import ChildrenAdminPage from "../pages/admin/childrenTheater/ChildrenAdminPage";
import ChildrenAdminCreatePage from "../pages/admin/childrenTheater/ChildrenAdminCreatePage";
import ActorAdminPage from "../pages/admin/actor/ActorAdminPage";
import ActorAdminCreatePage from "../pages/admin/actor/ActorAdminCreatePage";
import ActivityFilterAdminPage from "../pages/admin/activityFilter/ActivityFilterAdminPage";
import ActivityFilterAdminCreatePage from "../pages/admin/activityFilter/ActivityFilterAdminCreatePage";
import TheatreFilterAdminPage from "../pages/admin/theatreFilter/TheatreFilterAdminPage";
import TheatreFilterAdminCreatePage from "../pages/admin/theatreFilter/TheatreFilterAdminCreatePage";
// import RegisterPage from "../pages/register/RegisterPage";
// import LoginPage from "../pages/login/LoginPage";
export const CustomRouter = [
  {
    path: "/",
    element: <HomePage />,
    hideHeaderFooter: false,
  },
  {
    path: "/actors",
    element: <ActorsPage />,
    hideHeaderFooter: false,
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  //   hideHeaderFooter: true,
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   hideHeaderFooter: true,
  // },
  {
    path: "/childrens-theaters",
    element: <ChildrensTheaters />,
    hideHeaderFooter: false,
  },
  {
    path: "/theaters",
    element: <Theaters />,
    hideHeaderFooter: false,
  },
  {
    path: "/activity",
    element: <Activity />,
    hideHeaderFooter: false,
  },
  {
    path: "/theater/:theaterId",
    element: <TheaterDetail />,
    hideHeaderFooter: false,
  },
  {
    path: "/children/:childrenId",
    element: <ChildrenDetail />,
    hideHeaderFooter: false,
  },
  {
    path: "/activity/:activityId",
    element: <ActivityDetail />,
    hideHeaderFooter: false,
  },
  {
    path: "/actor/:actorId",
    element: <ActorDetail />,
    hideHeaderFooter: false,
  },
  {
    path: "/admin/theatre",
    element: <TheatreAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/theatre/create",
    element: <TheatreAdminCreatePage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/activity",
    element: <ActivityAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/activity/create",
    element: <ActivityAdminCreatePage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/children",
    element: <ChildrenAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/children/create",
    element: <ChildrenAdminCreatePage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/actor",
    element: <ActorAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/actor/create",
    element: <ActorAdminCreatePage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/activityfilter",
    element: <ActivityFilterAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/activityfilter/create",
    element: <ActivityFilterAdminCreatePage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/theatrefilter",
    element: <TheatreFilterAdminPage />,
    hideHeaderFooter: true,
  },
  {
    path: "/admin/theatrefilter/create",
    element: <TheatreFilterAdminCreatePage />,
    hideHeaderFooter: true,
  },
];
