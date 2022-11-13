import {createSlice, current} from '@reduxjs/toolkit';
import {getPerformanceByStudent, updateStatus} from './performaceAction';

const performaceSlice = createSlice({
    name : 'performace',
    initialState : {
        loading: false,
        error: null,
        success: false,
        listPerformance : [],
        listDone : [],
        // listInProcess : []
    },
    reducers : {},
    extraReducers : {
        [getPerformanceByStudent.pending] : (state) => {
            state.loading = true
        },
        [getPerformanceByStudent.fulfilled] : (state,action) => {
            state.loading = false
            if (action.payload.listPerfomace.length >= 1) {
                const listPerformance = action.payload.listPerfomace.filter(item => item.status ==='Đã gửi')
                const listDone = action.payload.listPerfomace.filter(item => item.status === 'Hoàn tất')
                state.listPerformance = listPerformance
                state.listDone = listDone
            }
            state.error = action.payload.message
            state.success = action.payload.success
        },
        [getPerformanceByStudent.rejected] : (state,action) => {
            state.loading = false
            state.success = false
        },
        [updateStatus.pending] : (state) => {
            state.loading = true
        },
        [updateStatus.fulfilled] : (state,action) => {
            const currentListPer = current(state).listPerformance
            const currentListDone = current(state).listDone
            const itemDone = currentListPer.filter(
                item => item._id === action.payload.performaceID
            )
            console.log(itemDone)
            state.listDone = [...currentListDone,itemDone[0]]
            state.listPerformance = currentListPer.filter(
                item => item._id !== action.payload.performaceID
            )
            state.loading = false
        },
        [updateStatus.rejected] : (state) => {
            state.loading  = false
        }
    }
})

export const { } = performaceSlice.actions
export default performaceSlice.reducer