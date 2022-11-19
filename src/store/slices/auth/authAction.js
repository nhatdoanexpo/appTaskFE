import {createAsyncThunk} from "@reduxjs/toolkit"
import authServices from "../../../services/authServices"

export const userLogin = createAsyncThunk(
    'user/login',
    async (data,thunkAPI) => {
        const {email,password} = data
        const respone = await authServices.authLogin(email,password)
        return respone
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async (data, thunkAPI) => {
        const {name,email,password} = data
        const response = await authServices.authRegister(name,email,password)
        return response
    }
)


export const getUser = createAsyncThunk(
    'user/getUser',
    async (data, thunkAPI) => {
        const {id } = data
        const response = await authServices.getUserInfo(id)
        return response
    }
)