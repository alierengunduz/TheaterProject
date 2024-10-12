import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChildrenTheatreType } from "../../types/type";

export const fetchActivityFilter = createAsyncThunk(
  "activityFilter/fetchActivityFilter",
  async (theatreId?: string) => {
    const response = theatreId
      ? await axios.get(`/api/activityFilter/${theatreId}`)
      : await axios.get("/api/activityFilter");
    return response.data;
  }
);

export const createActivityFilter = createAsyncThunk(
  "activity/createTheatre",
  async (activity: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/activityFilter", activity);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteActivityFilter = createAsyncThunk(
  "activity/deleteactivity",
  async (theatreId: string) => {
    const response = await axios.delete(`/api/activityFilter/${theatreId}`);
    return response.data;
  }
);

export interface ActivityFilterState {
  activityFilter: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  setActivityFilter: string;
}

const initialState: ActivityFilterState = {
  activityFilter: [],
  status: "idle",
  error: null,
  setActivityFilter: "",
};

export const activityFilterSlice = createSlice({
  name: "activityFilter",
  initialState,
  reducers: {
    setActivityFilter: (
      state: ActivityFilterState,
      action: PayloadAction<string>
    ) => {
      state.setActivityFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchActivityFilter.fulfilled,
        (state, action: PayloadAction<ChildrenTheatreType[]>) => {
          state.status = "succeeded";
          state.activityFilter = action.payload;
        }
      )
      .addCase(fetchActivityFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createActivityFilter.pending, (state: ActivityFilterState) => {
        state.status = "loading";
      })
      .addCase(
        createActivityFilter.fulfilled,
        (state: ActivityFilterState, action) => {
          state.status = "succeeded";
          state.activityFilter.unshift(action.payload);
        }
      )
      .addCase(
        createActivityFilter.rejected,
        (state: ActivityFilterState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      );
    builder.addCase(deleteActivityFilter.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteActivityFilter.fulfilled, (state, action) => {
      // Silme işlemi başarılı olduğunda Redux state'i güncelle
      state.activityFilter = state.activityFilter.filter(
        (activity) => activity._id !== action.payload._id // ID'ye göre filtreleme yap
      );
      state.status = "succeeded"; // İşlem başarılı olarak işaretlendi
    });

    builder.addCase(deleteActivityFilter.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setActivityFilter } = activityFilterSlice.actions;

export default activityFilterSlice.reducer;
