import {createAsyncThunk} from "@reduxjs/toolkit"
import ChallengerServices from "../../../services/challengerServices"


export const getChallengerByClass = createAsyncThunk(
    'challenger/getByClass',
    async (data, thunkAPI) => {
        const {classID}  = data
        const res = await ChallengerServices.getChallengerByClass(classID)
        return res
    }
)

export const getAllTypeChallenger = createAsyncThunk(
    'challenger/getType',
    async (data, thunkAPI) => {
        const res = await ChallengerServices.getAllTypeChallenger()
        return res
    }
)

export const addChallenger = createAsyncThunk(
    'challenger/addChallenger',
    async(data, thunkAPI) => {
        const {classID,typeID,name,note,teacherId} = data
        console.log(data)
        const res = await ChallengerServices.addChallenger(classID,typeID,name,note,teacherId)
        return res
    }
)

export const deleteChallenger = createAsyncThunk(
    'challenger/deleteChallenger',
    async (data, thunkAPI) => {
        const {challengerID} = data
        // console.log(challengerID)
        const res = await ChallengerServices.deleteChallenger(challengerID)
        return {
            res : res,
            id : challengerID
        }
    }
)