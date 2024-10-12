import { configureStore } from "@reduxjs/toolkit";
import TheaterReducer from "./features/theaterslice";
import TheaterFilter from "./features/theaterfilterslice";
import ChildTheatre from "./features/childrentheatreslice";
import ActivityTheatre from "./features/activitytheatreslice";
import ActivityFilter from "./features/activityfilterslice";
import ActorReducer from "./features/actorslice";
import UserReducer from "./features/userSlice";
export const store = configureStore({
  reducer: {
    theaters: TheaterReducer,
    theaterFilters: TheaterFilter,
    childrenTheatres: ChildTheatre,
    activityTheatres: ActivityTheatre,
    activityFilters: ActivityFilter,
    actors: ActorReducer,
    user: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
