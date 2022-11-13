import {createAsyncThunk} from "@reduxjs/toolkit";
import PerformanceServices from "../../../services/performanceServices";

export const getPerformanceByStudent = createAsyncThunk(
    'performace/getByStudent',
    async (data, thunkAPI) => {
        const {studentID} = data
        const res = await PerformanceServices.getPerformanceByStudentID(studentID)
        return res
    }
)

export const updateStatus = createAsyncThunk(
    'performace/updateStatus',
    async (data, thunkAPI) => {
        const {performaceID} = data
        const res = await PerformanceServices.updateStatus(performaceID)
        return {
            res : res,
            performaceID : performaceID
        }
    }
)