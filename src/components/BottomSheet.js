import {BottomSheet, ListItem} from '@rneui/base'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native';
import COLORS from '../constants/colors';

export default function ItemBottomSheet({isVisible,offBottomSheet, chooseValue ,listValue}) {

    
    const list = listValue

    return (
        <BottomSheet isVisible={isVisible}  containerStyle={{
            width : '100%',
            alignSelf : 'center',
            marginBottom : 20

        }}>
        {list?.map((item) => (
            <ListItem key={item._id} 
            onPress={() => {
                chooseValue(item)
                offBottomSheet()
            }}
            containerStyle = {{
                borderBottomColor : COLORS.primary,
                borderBottomWidth : 1
            }}
            Component={TouchableOpacity}>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight : 'bold'}}>{item.code ? item.code : `${item.name} - ${item.shortname}`}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        ))}
        <ListItem 
            // containerStyle={{backgroundColor : '#e74c3c'}} 
            onPress={offBottomSheet} >
            <ListItem.Content>
                <ListItem.Title style={{fontWeight : 'bold'}}>Cancel</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    </BottomSheet>

        
    )

    

}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'center'
    }
})