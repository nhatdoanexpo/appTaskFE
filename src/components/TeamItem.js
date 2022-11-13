import {Avatar} from '@rneui/base/dist/Avatar/Avatar';
import React from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import COLORS from '../constants/colors';

const Height = Dimensions.get('screen').height - 150
export default function Teamitem({onClick, item,...props }) {
    

    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <View style={styles.left}>
                <Text style={styles.txt}>Tên: {item.name}</Text>
                <Text style={styles.txt}>Email : {item.email}</Text>
            </View>
            <View style = {styles.right}>
                <Avatar
                size={80}
                rounded
                icon={{name: 'person',type :'ionicons', size : 50}}
                containerStyle = {{
                    backgroundColor : COLORS.primary
                }}
                />
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