import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import StudentPerformitem from '../components/Student_PerformItem';
import useVerifyToken from '../hooks/verifyToken'
import {getPerformanceByStudent, refreshData} from '../store/slices/performace/performaceAction';
import Loadingcontent from '../components/LoadingContent';
import Smalltext from '../components/SmallText';
import Custombutton from "../components/CustomButton";
import COLORS from "../constants/colors";
import {getUser } from "../store/slices/auth/authAction";
import {showMessage} from "react-native-flash-message";
import getUserRole from "../hooks/getUserRole";

export default function Studentchallengerscreen(props) {
    const userID = useVerifyToken()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userRole = getUserRole()
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        console.log('refres new')
        dispatch(getPerformanceByStudent({
            studentID : userID
        }))
    }, [listPerformace])
    const listPerformace = useSelector(state => state.performance.listPerformance)
    const handleChooseChallenger = (value) => {
        navigation.push('MissionScreen', {
            challenger : value.challengerID,
            disableAddMission : true
        })
    }

    const handleLoadChallenger = (value) => {
        console.log('refresh data')
        dispatch(refreshData({ id: userID }))
            .then(
                res => {
                    console.log('refresh data and load new')
                    dispatch(getPerformanceByStudent({
                        studentID : userID
                    }))
                }
            ).catch(
            error => showMessage({
                message : 'Warning',
                description : error,
                type : 'danger'
            })
        )
    }

    const renderItem = ({item}) => {
        return <StudentPerformitem item={item} onPress={handleChooseChallenger}/>
    }
    const loading = useSelector(state => state.performance.loading)
    return (
        <Loadingcontent loading = {loading}>
        <Smalltext color={COLORS.primary} size={16} marginH={10} marginV={5}>Có tổng cộng {listPerformace.length} thử thách</Smalltext>
        <FlatList
        data={listPerformace}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={()=> {
            dispatch(getPerformanceByStudent({
                studentID : userID
            }))
        }}
        onEndReachedThreshold={1}
        />
            {(userRole == 'HV') &&     <Custombutton   btnTitle={'Nhận thêm bài tập'}
                            btnColor={COLORS.yellow}
                            titleColor={COLORS.text}
                            marginHorizontal={10}
                            marginVertical={10}
                            txtSize={20}
                            btnHeight={10}
                            onPress={handleLoadChallenger}/>}
        </Loadingcontent>
    )
}


