import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChildrenTheatreType } from "../../types/type";
import axios from "axios";

export const fetchChildrenTheatre = createAsyncThunk(
  "childrenTheater/fetchTheater",
  async () => {
    try {
      const res = await axios.get("/api/childTheatre");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChildrenById = createAsyncThunk(
  "children/fetchChildrenById",
  async (childrenId: string) => {
    const response = await axios.get(`/api/childTheatre/${childrenId}`);
    return response.data as ChildrenTheatreType;
  }
);

export const createChildrenTheatre = createAsyncThunk(
  "theatre/createTheatre",
  async (theatre: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/childTheatre", theatre);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteChildren = createAsyncThunk(
  "children/childrenDelete",
  async (childrenId: string) => {
    const response = await axios.delete(`/api/childTheatre/${childrenId}`);
    return response.data;
  }
);

export const searchChildrenTheatre = createAsyncThunk(
  "childrenTheater/search",
  async (name: string) => {
    try {
      const res = await axios.get(`/api/childTheatre/search/${name}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export interface ChildrenTheatreState {
  childrenTheatre: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  childrenDetail: ChildrenTheatreType | null;
}

const initialState: ChildrenTheatreState = {
  childrenTheatre: [],
  status: "idle",
  error: null,
  childrenDetail: null,
};

export const childrenTheatreSlice = createSlice({
  name: "childrentheatre",
  initialState,
  reducers: {
    setChildrenDetail: (
      state: ChildrenTheatreState,
      action: PayloadAction<ChildrenTheatreType>
    ) => {
      state.childrenDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildrenTheatre.pending, (state: ChildrenTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        fetchChildrenTheatre.fulfilled,
        (
          state: ChildrenTheatreState,
          action: PayloadAction<ChildrenTheatreType[]>
        ) => {
          state.status = "succeeded";
          state.childrenTheatre = action.payload;
        }
      )
      .addCase(
        fetchChildrenTheatre.rejected,
        (state: ChildrenTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      .addCase(searchChildrenTheatre.pending, (state: ChildrenTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        searchChildrenTheatre.fulfilled,
        (
          state: ChildrenTheatreState,
          action: PayloadAction<ChildrenTheatreType[]>
        ) => {
          state.status = "succeeded";
          state.childrenTheatre = action.payload;
        }
      )
      .addCase(
        searchChildrenTheatre.rejected,
        (state: ChildrenTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      .addCase(createChildrenTheatre.pending, (state: ChildrenTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        createChildrenTheatre.fulfilled,
        (state: ChildrenTheatreState, action) => {
          state.status = "succeeded";
          state.childrenTheatre.unshift(action.payload);
        }
      )
      .addCase(
        createChildrenTheatre.rejected,
        (state: ChildrenTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      .addCase(fetchChildrenById.pending, (state: ChildrenTheatreState) => {
        state.status = "loading";
      })
      .addCase(
        fetchChildrenById.fulfilled,
        (state: ChildrenTheatreState, action) => {
          state.status = "succeeded";
          state.childrenDetail = action.payload;
        }
      )
      .addCase(
        fetchChildrenById.rejected,
        (state: ChildrenTheatreState, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch product";
        }
      );
    builder.addCase(deleteChildren.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteChildren.fulfilled, (state, action) => {
      const deletedTheatreId = action.meta.arg; // Silinen tiyatronun ID'sini direkt argümandan alabilirsiniz
      state.childrenTheatre = state.childrenTheatre.filter(
        (children) => children._id !== deletedTheatreId
      );
      state.status = "succeeded";
    });

    builder.addCase(deleteChildren.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setChildrenDetail } = childrenTheatreSlice.actions;

export default childrenTheatreSlice.reducer;
