import {createSlice, current} from '@reduxjs/toolkit';
import {addMission, getMissionByChallengerID} from './missionAction';

const missionSlice = createSlice({
    name : 'mission',
    initialState : {
        loading: false,
        error: null,
        success: false,
        listMission : []
    },
    reducers : {},
    extraReducers : {
        [getMissionByChallengerID.pending] : (state) => {
            state.loading = true
        },
        [getMissionByChallengerID.fulfilled] : (state,action) => {
            state.loading = false,
            state.listMission = action.payload
        },
        [getMissionByChallengerID.rejected] : (state) =>{
            state.loading = false
        },
        [addMission.pending] : (state) => {
            state.loading = true
        },
        [addMission.fulfilled] : (state,action) => {
            state.loading  = false
            const currentMission = current(state).listMission ? current(state).listMission : []
            const newList = [...currentMission,action.payload]
            state.listMission = newList
        },
        [addMission.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const { } = missionSlice.actions
export default missionSlice.reducer