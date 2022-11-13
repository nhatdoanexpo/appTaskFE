import React from 'react'
import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import COLORS from '../constants/colors';
import Ionicon from '@expo/vector-icons/Ionicons'
import {Swipeable} from 'react-native-gesture-handler';

const Height = Dimensions.get('screen').height - 150
export default function Missionitem({onClick, item,student, ...props }) {

    const renderRightActions = () => {
        return (
            <View style={styles.swipe}>
                <Animated.View style={styles.swipeBox} >
                    <TouchableOpacity style={styles.deleteBox} onPress={() => handleDeleteCat(item)}>
                        <Ionicon name='trash-outline' size={25} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };
    return (
        <Swipeable renderRightActions={() => !student ? renderRightActions() : null} >
        <View style={styles.container} >
            <View style={styles.left}>
                <Text style={styles.txt}>Mô tả : {item.des}</Text>
                <Text style={styles.txt}>Ghi chú : {item.note}</Text>
            </View>
            <View style={styles.right}>
                <Ionicon name='code-slash-outline' size={25} color={'white'}/>
            </View>
        </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        height: Height / 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        flexDirection : 'row'
    },
    left : {
        width : '90%',
        justifyContent : 'center',
    },
    right : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    logo : {
        width : 80,
        height : 80,
        borderRadius : 15
    },
    txt : {
        marginLeft : 20,
        marginBottom : 5,
        fontSize : 15,
        fontWeight : 'bold',
        color : COLORS.white
    },
    swipe: {
        width: '25%',
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
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7675',
        height: '80%',
        borderRadius: 15
    }
})