// redux/features/user/userSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterUserType, UserType } from "../../types/type";
interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  user: UserType | null;
  users: UserType[];
  error: string | null;
}

const initialState: UserState = {
  status: "idle",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  users: [],
};

export const register = createAsyncThunk(
  "user/register",
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users", userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/users/auth", userData);
      localStorage.setItem("user", JSON.stringify(data)); // Save user data to local storage
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/users/profile");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/users/logout");
      localStorage.removeItem("user");
      return; // No payload needed
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/users/allUser");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      return userId; // Return the user ID to remove from the list
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null; // Clear user data
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
