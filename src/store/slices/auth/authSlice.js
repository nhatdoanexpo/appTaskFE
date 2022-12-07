import {createSlice} from "@reduxjs/toolkit";
import {getUser, userLogin, userRegister} from "./authAction";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userRole: null,
        isLogin : false,
        error: null,
        success: false,
        token : '',
        userInfo : {},
        user : {} ,
        listClassData: []

    },
    reducers: {
        logOut : (state,action) => {
            AsyncStorage.setItem('access_Token','')
            return {
                ...state,
                loading: false,
                userRole: null,
                isLogin : false,
                error: null,
                success: false,
                token : ''
            }
        },
        addToken : (state,action) => {
            state.token = action.payload.token
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(userLogin.fulfilled,(state,action)=> {
            const {accessToken,role,success, message,email,name,user,listClassData,id} = action.payload
            success ? AsyncStorage.setItem('access_Token',accessToken) : AsyncStorage.setItem('access_Token','')
            return {
                ...state,
                loading : false,
                userRole : role,
                success : success,
                error : message,
                isLogin:  true,
                token : accessToken,
                userInfo : {
                    name : name,
                    email : email,
                    role : role,
                    id : id
                },
                user : user ,
                listClassData: listClassData
            }
        })
        .addCase(userLogin.rejected,(state,action)=> {
            state.error = action.payload.message,
            state.success = false
        })
        .addCase(userRegister.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(userRegister.fulfilled, (state,action) => {
            state.loading = false
            // console.log(action.payload)
        })
        .addCase(userRegister.rejected,(state,action)=> {
            // console.log(action.payload)
            console.log(action.error)
            return {
                ...state,
                loading : false,
                success : false
            }
        })
}})

export const { logOut, addToken } = authSlice.actions
export default authSlice.reducer