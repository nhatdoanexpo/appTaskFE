import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import StudentPerformitem from '../components/Student_PerformItem';
import useVerifyToken from '../hooks/verifyToken'
import {getPerformanceByStudent} from '../store/slices/performace/performaceAction';
import Loadingcontent from '../components/LoadingContent';
import Smalltext from '../components/SmallText';

export default function Studentchallengerscreen(props) {
    const userID = useVerifyToken()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
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
        </Loadingcontent>
    )
}


