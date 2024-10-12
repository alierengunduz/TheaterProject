import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChildrenTheatreType } from "../../types/type";

export const getAllActor = createAsyncThunk("actor/getall", async () => {
  try {
    const res = await axios.get("/api/actorTheatre");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchActorById = createAsyncThunk(
  "actor/fetchActorById",
  async (actorId: string) => {
    const response = await axios.get(`/api/actorTheatre/${actorId}`);
    return response.data as ChildrenTheatreType;
  }
);

export const searchActorTheatre = createAsyncThunk(
  "actorTheater/search",
  async (name: string) => {
    try {
      const res = await axios.get(`/api/actorTheatre/search/${name}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createActorTheatre = createAsyncThunk(
  "theatre/createTheatre",
  async (theatre: ChildrenTheatreType, thunkAPI) => {
    try {
      const response = await axios.post("/api/actorTheatre", theatre);
      return response.data as ChildrenTheatreType;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteActor = createAsyncThunk(
  "actor/actorDelete",
  async (actorId: string) => {
    const response = await axios.delete(`/api/actorTheatre/${actorId}`);
    return response.data;
  }
);

export interface ActorState {
  actor: ChildrenTheatreType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  actorDetail: ChildrenTheatreType | null;
}

const initialState: ActorState = {
  actor: [],
  status: "idle",
  error: null,
  actorDetail: null,
};

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    setActorDetail: (
      state: ActorState,
      action: PayloadAction<ChildrenTheatreType>
    ) => {
      state.actorDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllActor.pending, (state: ActorState) => {
        state.status = "loading";
      })
      .addCase(
        getAllActor.fulfilled,
        (state: ActorState, action: PayloadAction<ChildrenTheatreType[]>) => {
          state.status = "succeeded";
          state.actor = action.payload;
        }
      )
      .addCase(getAllActor.rejected, (state: ActorState, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(searchActorTheatre.pending, (state: ActorState) => {
        state.status = "loading";
      })
      .addCase(
        searchActorTheatre.fulfilled,
        (state: ActorState, action: PayloadAction<ChildrenTheatreType[]>) => {
          state.status = "succeeded";
          state.actor = action.payload;
        }
      )
      .addCase(searchActorTheatre.rejected, (state: ActorState, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createActorTheatre.pending, (state: ActorState) => {
        state.status = "loading";
      })
      .addCase(createActorTheatre.fulfilled, (state: ActorState, action) => {
        state.status = "succeeded";
        state.actor.unshift(action.payload);
      })
      .addCase(createActorTheatre.rejected, (state: ActorState, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchActorById.pending, (state: ActorState) => {
        state.status = "loading";
      })
      .addCase(fetchActorById.fulfilled, (state: ActorState, action) => {
        state.status = "succeeded";
        state.actorDetail = action.payload;
      })
      .addCase(fetchActorById.rejected, (state: ActorState, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch product";
      });
    builder.addCase(deleteActor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteActor.fulfilled, (state, action) => {
      const deletedTheatreId = action.meta.arg; // Silinen tiyatronun ID'sini direkt argümandan alabilirsiniz
      state.actor = state.actor.filter((ac) => ac._id !== deletedTheatreId);
      state.status = "succeeded";
    });

    builder.addCase(deleteActor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setActorDetail } = actorSlice.actions;

export default actorSlice.reducer;
