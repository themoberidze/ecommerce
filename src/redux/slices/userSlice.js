import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../application";

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser", 
    async (values, {rejectWithValue}) => {
        try {
            const route = `/users/${values.isLogin ? "login" : "register"}`;
            const {data} = await axiosInstance.post(route, values.formValues);
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh_token", data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue("error during login");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        userInfo: null,
    },
    
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem("token");
            localStorage.removeItem("reftesh_token");
        },
    },

    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.error = null;
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
