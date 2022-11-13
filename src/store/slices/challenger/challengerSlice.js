import {createSlice, current} from "@reduxjs/toolkit";
import {deleteChallenger, getAllTypeChallenger, getChallengerByClass} from './challengerAction';

const challengerSlice = createSlice({
    name: 'challenger',
    initialState: {
        loading: false,
        error: null,
        success: false,
        listChallenger : [],
        listType : []

    },
    reducers: {},
    extraReducers: {
        [getChallengerByClass.pending] : (state) => {
            state.loading = true
        },
        [getChallengerByClass.fulfilled] : (state,action) => {
            state.loading = false
            state.error = action.payload.message 
            state.listChallenger = action.payload.listChallenger
            state.success = action.payload.success
        },
        [getChallengerByClass.rejected] : (state) => {
            state.loading = false
        },
        [getAllTypeChallenger.pending] : (state) => {
            state.loading = true
        },
        [getAllTypeChallenger.fulfilled] : (state,action) => {
            state.loading = false
            state.listType = action.payload.ChallengerTypes
            state.error = action.payload.message 
            state.success = action.payload.success
        },
        [getAllTypeChallenger.rejected] : (state) => {
            state.loading = false
        },
        [deleteChallenger.pending] : (state) => {
            state.loading = true
        },
        [deleteChallenger.fulfilled] : (state, action) => {
            state.loading = false
            const currentList = current(state).listChallenger
            if (action.payload.res.success){
                if(currentList.length > 1) {
                    state.listChallenger = currentList.filter(item => item._id !== action.payload.id)
                }else {
                    state.listChallenger = []
                }
            }
            state.message = action.payload.res.message
            state.success = action.payload.res.success
        },
        [deleteChallenger.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const { } = challengerSlice.actions
export default challengerSlice.reducer