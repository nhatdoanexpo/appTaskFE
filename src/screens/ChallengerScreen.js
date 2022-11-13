import React, {useEffect, useState} from 'react'

import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Ionicon from '@expo/vector-icons/Ionicons';
import Smalltext from '../components/SmallText';
import COLORS from '../constants/colors';
import ItemBottomSheet from '../components/BottomSheet';
import {getAllTypeChallenger, getChallengerByClass} from '../store/slices/challenger/challengerAction';
import Challengeritem from '../components/ChallengerItem';
import Custombutton from '../components/CustomButton';
import Addchallengermodal from '../components/AddChallengerModal';
import {addCurrentClass} from '../store/slices/class/classSlice';
import {useNavigation} from '@react-navigation/native';
import Loadingcontent from '../components/LoadingContent';

export default function Challengerscreen(props) {
    const navigation = useNavigation()
    const [isVisible_ModalClass, setisVisible_ModalClass] = useState(false)
    const [isVisible_AddChallengerModal, setisVisible_AddChallengerModal] = useState(false)
    const [className, setclassName] = useState()
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        dispatch(getAllTypeChallenger())
    }, [])
    const dispatch =useDispatch()
    const handleChooseClass = (classInfo) => {
        const {_id,code} = classInfo
        setclassName(code)
        dispatch(getChallengerByClass({classID : _id}))
        .then(()=> {
            setisLoading(false)
            dispatch(addCurrentClass({classID : _id}))
        })
    }
    const listChallenger = useSelector(state => state.challenger.listChallenger)
    const listClass = useSelector(state => state.class.listClass)
    const handleChooseChallenger = (value) => {
        navigation.push('MissionScreen',{challenger : value})
    }
    const renderItem = ({item}) => {
        return (
            <Challengeritem key={item._id} item={item} onPress={handleChooseChallenger}/>
        )
    }

    if (isLoading) {
        return <Loadingcontent loading={true}></Loadingcontent>
    }
    return (
        <View style={styles.container}>
            <Addchallengermodal isVisible={isVisible_AddChallengerModal} 
                                closeModal={() =>setisVisible_AddChallengerModal(false)}/>  
            {/* List de chon lop hoc */}
            <ItemBottomSheet    isVisible={isVisible_ModalClass} 
                                offBottomSheet={() =>setisVisible_ModalClass(false)}
                                chooseValue={handleChooseClass}
                                listValue={listClass}/>
            <View style={styles.dropDownClass}>
                <View style={styles.className}>
                    <Smalltext>Lớp :</Smalltext>
                    <Smalltext color={COLORS.pink} bold={true}> {className}</Smalltext>
                </View>
                <TouchableOpacity   style={styles.fillBox}
                                    onPress={()=> setisVisible_ModalClass(true)}>
                <Ionicon name='funnel-outline' size={25} style={styles.btnOpen}/>
                </TouchableOpacity>
            </View>
            <Smalltext color={COLORS.primary} size={16} marginH={10}>Có tổng cộng {listChallenger.length} thử thách</Smalltext>
            <View style={styles.listChallenger}>
            <FlatList
            data={listChallenger}
            key={item => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}/>
            </View>
            <Custombutton   btnTitle={'Thêm thử thách'} 
                            btnColor={COLORS.yellow} 
                            titleColor={COLORS.text}
                            marginHorizontal={10}
                            marginVertical={10}
                            txtSize={20}
                            btnHeight={10}
                            onPress={() =>{
                                if(className){
                                    setisVisible_AddChallengerModal(true)
                                }else {
                                    alert('Phải chọn lớp')
                                }
                            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dropDownClass: {
        flex : 1,
        marginVertical : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : 10,
        marginHorizontal : 10,
        borderWidth : 1,
        paddingHorizontal : 10
    },
    listChallenger: {
        flex : 12,
        // backgroundColor: 'blue',
        height : '100%'
    },
    className : {
        flexDirection : 'row'
    },
    fillBox : {
        width : 50,
        height : 40,
        backgroundColor : COLORS.smallTxt,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    addNewBtn:{
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%'
    }
})