import {createAsyncThunk} from "@reduxjs/toolkit"
import classServices from "../../../services/classServices"
import MissionServices from "../../../services/missionServices";

export const getClassByMentor = createAsyncThunk(
    'class/getClassByMentor',
    async (data,thunkAPI) => {
        const {userID} = data
        const respone = await classServices.getClassbyMentor(userID)
        return respone
    }
)
export const addClass = createAsyncThunk(
    'class',
    async(data, thunkAPI) => {
        const res = await classServices.addClass(data)
        return res
    }
)

export const addStudent = createAsyncThunk(
    'class',
    async(data, thunkAPI) => {
        const res = await classServices.addClass(data)
        return res
    }
)

