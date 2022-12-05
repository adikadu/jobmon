import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import customFetch from "../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  deleteUserFromLocalStorage,
} from "../utils/localStorage";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, thunkApi) => {
    try {
      const res = await customFetch.post("/auth/register", payload);
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const registerTestUser = createAsyncThunk(
  "user/registerTestUser",
  async (payload, thunkApi) => {
    try {
      const res = await customFetch.post("/auth/testingRegister", payload);
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkApi) => {
    try {
      const res = await customFetch.post("/auth/login", payload);
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, thunkApi) => {
    try {
      const res = await customFetch.patch("/auth/updateUser", payload, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return res.data.user;
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const addJob = createAsyncThunk(
  "job/addJob",
  async (payload, thunkApi) => {
    try {
      console.log("payload", payload);
      const res = await customFetch.post("/jobs", payload, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return res.data.job;
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkApi) => {
    try {
      const { page, search, searchStatus, searchType, sort } =
        thunkApi.getState().allJobs;
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if (search) {
        url += `&search=${search}`;
      }
      const res = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkApi) => {
    try {
      await customFetch.delete(`jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(getAllJobs());
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (payload, thunkApi) => {
    try {
      const res = await customFetch.patch(
        `/jobs/${payload.jobId}`,
        {
          position: payload.position,
          company: payload.company,
          jobLocation: payload.jobLocation,
          jobType: payload.jobType,
          status: payload.status,
        },
        {
          headers: {
            authorization: `Bearer ${thunkApi.getState().user.user.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const showStats = createAsyncThunk(
  "getAllJobs/",
  async (_, thunkApi) => {
    try {
      const resp = await customFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        setTimeout(() => thunkApi.dispatch(userActions.logoutUser()), 1000);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

const userInitialState = { isLoading: false, user: getUserFromLocalStorage() };

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    logoutUser() {
      deleteUserFromLocalStorage();
      toast.success("Logged Out Successfully!");
      return { isLoading: false, user: null };
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      toast.success(`Welcome ${payload.name}`);
      addUserToLocalStorage(payload);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [registerTestUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerTestUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      toast.success(`Welcome ${payload.name}`);
      addUserToLocalStorage(payload);
    },
    [registerTestUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      addUserToLocalStorage(payload);
      toast.success(`Welcome ${payload.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      deleteUserFromLocalStorage();
      addUserToLocalStorage(payload);
      toast.success("Update successful!");
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

const jobInitialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobType: "full-time",
  status: "pending",
  isEditing: false,
  editJobId: "",
};
const jobSlice = createSlice({
  name: "job",
  initialState: jobInitialState,
  reducers: {
    editJob(
      state,
      { payload: { jobId, position, company, jobLocation, status, jobType } }
    ) {
      state.position = position;
      state.company = company;
      state.jobLocation = jobLocation;
      state.status = status;
      state.jobType = jobType;
      state.editJobId = jobId;
      state.isEditing = true;
    },
  },
  extraReducers: {
    [addJob.pending]: (state) => {
      state.isLoading = true;
    },
    [addJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Added job successfully!");
    },
    [addJob.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job deleted successfully!");
    },
    [deleteJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isEditing = false;
      toast.success("Job Modified Successfully...");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isEditing = false;
      toast.error(payload);
    },
  },
});

const getAllJobsSlice = createSlice({
  name: "getAllJobs",
  initialState: {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: "",
    searchStatus: "all",
    searchType: "all",
    sort: "latest",
  },
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    updateSearch: (state, { payload }) => {
      state.search = payload;
    },
    updateSearchStatus: (state, { payload }) => {
      state.searchStatus = payload;
    },
    updateSearchType: (state, { payload }) => {
      state.searchType = payload;
    },
    updateSort: (state, { payload }) => {
      state.sort = payload;
    },
    resetToInitialState: (state) => {
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (
      state,
      { payload: { jobs, totalJobs, numOfPages } }
    ) => {
      state.isLoading = false;
      state.jobs = [...jobs];
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    job: jobSlice.reducer,
    allJobs: getAllJobsSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const allJobsActions = getAllJobsSlice.actions;
export const jobActions = jobSlice.actions;
export default store;
