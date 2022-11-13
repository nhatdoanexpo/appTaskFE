import {createSlice} from "@reduxjs/toolkit";
import {getClassByMentor} from "./classAction";

const classSlice = createSlice({
    name: 'class',
    initialState: {
        loading: false,
        error: null,
        success: false,
        listClass : [],
        currentClassID : null

    },
    reducers: {
        addCurrentClass : (state,action) => {
            state.currentClassID = action.payload.classID
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getClassByMentor.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(getClassByMentor.fulfilled, (state, action) => {
            return {
                ...state,
                loading : false,
                listClass : action.payload.listClass,
                success : action.payload.success
            }
        })
        .addCase(getClassByMentor.rejected,(state,action)=> {
            return {
                ...state,
                loading : false,
                success : false,
                error : ''
            }
        })
}})

export const {addCurrentClass } = classSlice.actions
export default classSlice.reducer