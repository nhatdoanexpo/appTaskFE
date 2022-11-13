import React from 'react'
import {StyleSheet, View} from 'react-native'
import COLORS from '../constants/colors';

export default function Backgroundview({children}) {
    

    return (
        <View style={styles.container} >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLORS.background
    }
})
