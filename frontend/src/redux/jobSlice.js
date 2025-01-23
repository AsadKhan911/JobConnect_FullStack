import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs: [], //array when we have data in array format , when we have single like user we use null as initial state
        singleJob: null,
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJobs:[],
        searchQuery:"",
        singleJobById: null
    },
    reducers : {
        //actions
        setAllJobs: (state,action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state,action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state,action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByText: (state,action) => {
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery:(state,action) => {
            state.searchQuery = action.payload
        },
        setSingleJobById:(state,action) => {
            state.singleJobById = action.payload
        }
    }
})

export const {setAllJobs , setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchQuery, setSingleJobById} = jobSlice.actions
export default jobSlice.reducer