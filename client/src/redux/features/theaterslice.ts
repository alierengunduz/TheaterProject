import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChildrenTheatreType } from "../../types/type";

export const fetchTheatre = createAsyncThunk(
  "theater/fetchTheater",
  async ({ type, sortOrder }: { type: string; sortOrder: string }) => {
    const response = await axios.get("/api/theatre", {
      params: { type, sortOrder },
    });
    return response.data;
  }
);

export const fetchTheaterById = createAsyncThunk(
  "theater/fetchProductById",
  async (theaterId: string) => {
    const response = await axios.get(`/api/theatre/${theaterId}`);
    return response.data as ChildrenTheatreType;
  }
);

export const createTheatre = createAsyncThunk(
  "theatre/createTheatre",
  async (theatre: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/theatre", theatre);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteTheaterFilter = createAsyncThunk(
  "theatre/theatreactivity",
  async (theatreId: string) => {
    const response = await axios.delete(`/api/theatre/${theatreId}`);
    return response.data;
  }
);

export interface TheatreState {
  theater: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  theaterDetail: ChildrenTheatreType | null;
  sortOrder: string;
}

const initialState: TheatreState = {
  theater: [],
  status: "idle",
  error: null,
  theaterDetail: null,
  sortOrder: "date",
};

export const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    setSortOrder: (state: TheatreState, action) => {
      state.sortOrder = action.payload;
    },
    setTheaterDetail: (
      state: TheatreState,
      action: PayloadAction<ChildrenTheatreType>
    ) => {
      state.theaterDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheatre.pending, (state: TheatreState) => {
        state.status = "loading";
      })
      .addCase(
        fetchTheatre.fulfilled,
        (state: TheatreState, action: PayloadAction<ChildrenTheatreType[]>) => {
          state.status = "succeeded";

          // Sıralama işlemi (en son eklenen başta olacak şekilde)
          if (state.sortOrder === "alphabet") {
            state.theater = action.payload.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          } else if (state.sortOrder === "date") {
            // createdAt alanına göre ters sıralama yap (en son eklenen en başta)
            state.theater = action.payload.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }
        }
      )
      .addCase(fetchTheatre.rejected, (state: TheatreState, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createTheatre.pending, (state: TheatreState) => {
        state.status = "loading";
      })
      .addCase(createTheatre.fulfilled, (state: TheatreState, action) => {
        state.status = "succeeded";
        state.theater.unshift(action.payload);
      })
      .addCase(createTheatre.rejected, (state: TheatreState, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchTheaterById.pending, (state: TheatreState) => {
        state.status = "loading";
      })
      .addCase(fetchTheaterById.fulfilled, (state: TheatreState, action) => {
        state.status = "succeeded";
        state.theaterDetail = action.payload;
      })
      .addCase(fetchTheaterById.rejected, (state: TheatreState, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch product";
      });
    builder.addCase(deleteTheaterFilter.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTheaterFilter.fulfilled, (state, action) => {
      const deletedTheatreId = action.meta.arg; // Silinen tiyatronun ID'sini direkt argümandan alabilirsiniz
      state.theater = state.theater.filter(
        (theater) => theater._id !== deletedTheatreId
      );
      state.status = "succeeded";
    });

    builder.addCase(deleteTheaterFilter.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setSortOrder, setTheaterDetail } = theaterSlice.actions;

export default theaterSlice.reducer;
