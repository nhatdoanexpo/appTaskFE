import {createAsyncThunk} from "@reduxjs/toolkit";
import MissionServices from "../../../services/missionServices";

export const getMissionByChallengerID = createAsyncThunk(
    'mission/getMissionByChlID',
    async(data, thunkAPI) => {
        const {challengerID} = data
        const res = await MissionServices.getMissionByChallengerID(challengerID)
        return res
    }
)

export const addMission = createAsyncThunk(
    'mission/addMission',
    async(data, thunkAPI) => {
        const {challengerID,des,note} = data
        const res = await MissionServices.addMission(challengerID,des,note)
        return res
    }
)