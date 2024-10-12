import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChildrenTheatreType } from "../../types/type";

export const fetchTheatreFilter = createAsyncThunk(
  "theaterFilter/fetchTheatreFilter",
  async (theatreId?: string) => {
    const response = theatreId
      ? await axios.get(`/api/theatreFilter/${theatreId}`)
      : await axios.get("/api/theatreFilter");
    return response.data;
  }
);

export const createTheatreFilter = createAsyncThunk(
  "theaterFilter/createTheatre",
  async (theatre: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/theatreFilter", theatre);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteTheaterFilter = createAsyncThunk(
  "theaterFilter/theaterFilterDelete",
  async (theaterId: string) => {
    const response = await axios.delete(`/api/theatreFilter/${theaterId}`);
    return response.data;
  }
);

export interface TheatreFilterState {
  theaterFilter: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  setTheaterFilter: string;
}

const initialState: TheatreFilterState = {
  theaterFilter: [],
  status: "idle",
  error: null,
  setTheaterFilter: "",
};

export const theaterFilterSlice = createSlice({
  name: "theaterFilter",
  initialState,
  reducers: {
    setTheaterFilter: (
      state: TheatreFilterState,
      action: PayloadAction<string>
    ) => {
      state.setTheaterFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheatreFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTheatreFilter.fulfilled,
        (state, action: PayloadAction<ChildrenTheatreType[]>) => {
          state.status = "succeeded";
          state.theaterFilter = action.payload;
        }
      )
      .addCase(fetchTheatreFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createTheatreFilter.pending, (state: TheatreFilterState) => {
        state.status = "loading";
      })
      .addCase(
        createTheatreFilter.fulfilled,
        (state: TheatreFilterState, action) => {
          state.status = "succeeded";
          state.theaterFilter.unshift(action.payload);
        }
      )
      .addCase(
        createTheatreFilter.rejected,
        (state: TheatreFilterState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      );
    builder.addCase(deleteTheaterFilter.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTheaterFilter.fulfilled, (state, action) => {
      const deletedTheatreId = action.meta.arg; // Silinen tiyatronun ID'sini direkt argümandan alabilirsiniz
      state.theaterFilter = state.theaterFilter.filter(
        (the) => the._id !== deletedTheatreId
      );
      state.status = "succeeded";
    });

    builder.addCase(deleteTheaterFilter.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setTheaterFilter } = theaterFilterSlice.actions;

export default theaterFilterSlice.reducer;
