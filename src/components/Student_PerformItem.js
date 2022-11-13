import React from 'react'
import {Alert, Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Swipeable} from 'react-native-gesture-handler';
import COLORS from '../constants/colors';
import Ionicon from '@expo/vector-icons/Ionicons'
import {useDispatch} from 'react-redux';
import {updateStatus} from '../store/slices/performace/performaceAction';
import {showMessage} from 'react-native-flash-message';

export default function StudentPerformitem({item, onPress, noPress}) {
    const dispatch = useDispatch()
    const handleDone = (item ) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn báo hoàn thành thử thách này ?",
            [
                {
                    text: "Huỷ",
                    style:"cancel",
                },
                {
                    text : "Gửi",
                    onPress: () => {
                        dispatch(updateStatus({
                            performaceID : item._id
                        }))
                        .then(
                            res =>  {
                                if (res.payload.res.success === true){
                                    showMessage({
                                        message : 'Thông báo',
                                        description : 'Gửi thành công!',
                                        type : 'success'
                                    })
                                }else {
                                    showMessage({
                                        message : 'Thông báo',
                                        description : 'Gửi không thành công!',
                                        type : 'warning'
                                    })
                                }
                            }
                        ).catch(
                            err => {
                                showMessage({
                                    message : 'Thông báo',
                                    description : 'Xảy ra lỗi',
                                    type : 'danger'
                                })
                            }
                        )
                    },
                    style : 'destructive'
                }
            ],
        )

    }
    const renderRightActions = () => {
        return (
            <View style={styles.swipe}>
                <Animated.View style={styles.swipeBox} >
                    <TouchableOpacity style={styles.deleteBox} onPress={() => handleDone(item)}>
                        <Ionicon name='checkmark-done-outline' size={25} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    
    return (
        <Swipeable renderRightActions={() => noPress ? null : renderRightActions()}>
        {
            noPress ? 
            (
                <View style={[styles.container,{
                    backgroundColor : COLORS.smallTxt
                }]}>
                    <View style={styles.left}>
                    <Text style={[styles.txt, {
                        color: COLORS.primary,
                        fontSize : 18
                    }]}>Lớp: {item.challengerID.classID.code} </Text>
                    <Text style={styles.txt}>Tên : {item.challengerID.name} </Text>
                    <Text style={styles.txt}>Ghi chú : {item.challengerID.note}</Text>
                    <Text style={[styles.txt, {
                        color: COLORS.yellow
                    }]}>Loại TT : {item.challengerID.type.name} </Text>
                    </View>
                </View>
            ):
            (<TouchableOpacity style={[styles.container,{
            }]} onPress={() => onPress(item)}>
                <View style={styles.left}>
                <Text style={[styles.txt, {
                    color: COLORS.primary,
                    fontSize : 18
                }]}>Lớp: {item.challengerID.classID.code} </Text>
                <Text style={styles.txt}>Tên : {item.challengerID.name} </Text>
                <Text style={styles.txt}>Ghi chú : {item.challengerID.note}</Text>
                <Text style={[styles.txt, {
                    color: COLORS.yellow
                }]}>Loại TT : {item.challengerID.type.name} </Text>
                </View>
            </TouchableOpacity>)
        }
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.pink,
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection : 'row'
    },
    left : {
        width : '100%'
    }
    ,
    right : {
        justifyContent : 'center',
        alignItems : 'center',
    }
    ,
    txt: {
        marginLeft: 20,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.white
    },
    swipe: {
        width: '30%',
        height: '100%'
        // flexDirection : 'row'
    },
    swipeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'red',
        height: '100%'
    },
    deleteBox: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81ecec',
        height: '80%',
        borderRadius: 15
    }
})
