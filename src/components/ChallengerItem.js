import React from 'react'
import {Alert, Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import COLORS from '../constants/colors';
import Ionicon from '@expo/vector-icons/Ionicons'
import {Swipeable} from 'react-native-gesture-handler';
import PerformanceServices from '../services/performanceServices';
import useVerifyToken from '../hooks/verifyToken';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {deleteChallenger, getChallengerByClass} from '../store/slices/challenger/challengerAction';

export default function Challengeritem({ item, onPress }) {
    const userID = useVerifyToken()
    const dispatch = useDispatch()
    const currentClassID = useSelector(state => state.class.currentClassID)
    const handleDeleteChallenger = (item) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn xoá thử thách này ?",
            [
                {
                    text: "Huỷ",
                    style:"cancel",
                },
                {
                    text : "Xoá",
                    onPress: () => {
                        dispatch(deleteChallenger({
                            challengerID : item._id
                        }))
                    },
                    style : 'destructive'
                }
            ],
        )
    }
    const handlePushChallenger = (item) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn gửi thử thách này cho học viên ?",
            [
                {
                    text: "Huỷ",
                    style:"cancel",
                },
                {
                    text : "Gửi",
                    onPress: () => {
                        PerformanceServices.addPerformancesByChallenger(userID, item.classID, item._id)
                        .then(res => {
                            showMessage({
                                message : 'Thông báo',
                                description : 'Gửi thành công',
                                type : 'success'
                            })
                            dispatch(getChallengerByClass({
                                classID : currentClassID
                            }))
                        })
                        .catch(err => 
                            {
                            showMessage({
                            message : 'Thông báo',
                            description : err.response.data.message,
                            type : 'warning'
                        })
                        console.log(err)
                    }
                        
                        )
                    }
                }
            ],
        )
    }
    // Action to handle swipeRight
    const renderRightActions = (item) => {
        return (
            <View style={styles.swipe}>
                <Animated.View style={styles.swipeBox} >
                    <TouchableOpacity style={styles.deleteBox} onPress={() => handleDeleteChallenger(item)}>
                        <Ionicon name='trash-outline' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editBox} onPress={() => handlePushChallenger(item)}>
                        <Ionicon name='notifications-outline' size={25} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={() => !item.sentStatus ? renderRightActions(item) : null} >
            <TouchableOpacity style={[styles.container,{
                backgroundColor : item.sentStatus ? COLORS.primary : COLORS.pink
            }]} onPress={() => onPress(item)}>
                <View style={styles.left}>
                <Text style={styles.txt}>Tên : {item.name}</Text>
                <Text style={styles.txt}>Ghi chú : {item.note}</Text>
                <Text style={[styles.txt, {
                    color: COLORS.yellow
                }]}>Loại TT : {item.type.name}</Text>
                </View>
                <View style={styles.right}>
                    {
                        item.sentStatus ? 
                        <Text style={styles.txt}>Đã gửi</Text> : null
                    }
                </View>
            </TouchableOpacity>
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
        width : '80%'
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
        width: '40%',
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
    editBox: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        borderRadius: 15,
        backgroundColor: '#55efc4',
        marginLeft: 5
    },
    deleteBox: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7675',
        height: '80%',
        borderRadius: 15
    }
})