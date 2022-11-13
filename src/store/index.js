import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/auth/authSlice';
import classReducer from './slices/class/classSlice'
import challengerReducer from './slices/challenger/challengerSlice'
import missionReducer from './slices/mission/missionSlice'
import performaceReducer from './slices/performace/performaceSlice'

const store = configureStore({
    reducer : {
        user : authReducer,
        class : classReducer,
        challenger : challengerReducer,
        mission : missionReducer,
        performance : performaceReducer
    }
})

export default store