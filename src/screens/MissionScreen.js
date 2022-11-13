import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import AddMissionModal from '../components/AddMissionModal';
import Custombutton from '../components/CustomButton';
import Missionitem from '../components/MissionItem';
import {getMissionByChallengerID} from '../store/slices/mission/missionAction';
import Loadingcontent from '../components/LoadingContent';
import COLORS from "../constants/colors";

export default function Missionscreen({route}) {
    const challengerID = route.params.challenger._id 
    const challengerSentStatus = route.params.challenger.sentStatus
    const disbableAddMission = route.params.disableAddMission
    const checkHide = () => {
        if (typeof challengerSentStatus !== 'undefined') {
            return !challengerSentStatus
        }else{
            return !disbableAddMission
        }
    }
    const valueHide = checkHide()
    
    
    const [isVisible_AddMissionModal, setisVisible_AddMissionModal] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMissionByChallengerID({challengerID : challengerID}))
        .then(()=> {
            setisLoading(false)
        })
    }, [challengerID])


    const listMission = useSelector(state => state.mission.listMission)
    const renderItem = ({item}) => {
        return <Missionitem item={item} student/>
    }
    if (isLoading) {
        return <Loadingcontent loading={true}></Loadingcontent>
    }
    return (
        <View style={styles.container}>
            <AddMissionModal challengerID={challengerID}
                             isVisible={isVisible_AddMissionModal}
                             closeModal={()=> setisVisible_AddMissionModal(false)}/>

            <FlatList
            data={listMission}
            key={item => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}/>
            {
                (valueHide) &&
                <Custombutton   btnTitle={'Thêm nhiệm vụ'}
                                btnColor={COLORS.yellow}
                                titleColor={COLORS.text}
                marginHorizontal={10}
                marginVertical={10}
                txtSize={20}
                btnHeight={10}
                onPress={()=>setisVisible_AddMissionModal(true)}
                />

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})