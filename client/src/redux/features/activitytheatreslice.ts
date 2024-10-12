import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChildrenTheatreType } from "../../types/type";
import axios from "axios";

export const fetchActivityTheatre = createAsyncThunk(
  "activity/theatre",
  async ({ category }: { category: string }, thunkAPI) => {
    try {
      const res = await axios.get("/api/activityTheatre", {
        params: { category },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchActivityById = createAsyncThunk(
  "activity/fetchActivityById",
  async (activityId: string) => {
    const response = await axios.get(`/api/activityTheatre/${activityId}`);
    return response.data as ChildrenTheatreType;
  }
);

export const createActivityTheatre = createAsyncThunk(
  "activity/createTheatre",
  async (theatre: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/activityTheatre", theatre);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activity/theatreactivity",
  async (activityId: string) => {
    const response = await axios.delete(`/api/activityTheatre/${activityId}`);
    return response.data;
  }
);

export interface ActivityTheatreState {
  activityTheatre: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  activityDetail: ChildrenTheatreType | null;
}

const initialState: ActivityTheatreState = {
  activityTheatre: [],
  status: "idle",
  error: null,
  activityDetail: null,
};

export const activityTheatreSlice = createSlice({
  name: "activityTheatre",
  initialState,
  reducers: {
    setActivityDetail: (
      state: ActivityTheatreState,
      action: PayloadAction<ChildrenTheatreType>
    ) => {
      state.activityDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityTheatre.pending, (state: ActivityTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        fetchActivityTheatre.fulfilled,
        (
          state: ActivityTheatreState,
          action: PayloadAction<ChildrenTheatreType[]>
        ) => {
          state.status = "succeeded";
          state.activityTheatre = action.payload;
        }
      )
      .addCase(createActivityTheatre.pending, (state: ActivityTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        createActivityTheatre.fulfilled,
        (state: ActivityTheatreState, action) => {
          state.status = "succeeded";
          state.activityTheatre.unshift(action.payload);
        }
      )
      .addCase(
        createActivityTheatre.rejected,
        (state: ActivityTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      .addCase(fetchActivityById.pending, (state: ActivityTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        fetchActivityById.fulfilled,
        (state: ActivityTheatreState, action) => {
          state.status = "succeeded";
          state.activityDetail = action.payload;
        }
      )
      .addCase(
        fetchActivityById.rejected,
        (state: ActivityTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch product";
        }
      );
    builder.addCase(deleteActivity.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      const deletedTheatreId = action.meta.arg; // Silinen tiyatronun ID'sini direkt argümandan alabilirsiniz
      state.activityTheatre = state.activityTheatre.filter(
        (activity) => activity._id !== deletedTheatreId
      );
      state.status = "succeeded";
    });

    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setActivityDetail } = activityTheatreSlice.actions;

export default activityTheatreSlice.reducer;
