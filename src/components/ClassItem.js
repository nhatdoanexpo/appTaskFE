import React from 'react'
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import COLORS from '../constants/colors';
import {IMAGE} from '../constants/image';

const Height = Dimensions.get('screen').height - 150
export default function Classitem({onClick, name, code, ...props }) {


    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <View style={styles.left}>
                <Text style={styles.txt}>Tên lớp : {name}</Text>
                <Text style={styles.txt}>Mã lớp : {code}</Text>
            </View>
            <View style={styles.right}>
                <Image source={IMAGE.logo} style={styles.logo}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.pink,
        height: Height / 7,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        flexDirection : 'row'
    },
    left : {
        width : '75%',
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
    }
})