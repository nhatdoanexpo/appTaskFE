import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Donescreen from '../screens/DoneScreen';
import Ionicon from '@expo/vector-icons/Ionicons'
import COLORS from '../constants/colors';
import Studentchallengerstack from './StudentChallengerStack';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const StudenTab = createBottomTabNavigator()

export default function Studentnavigation(props) {
    const navigation = useNavigation()

    return (
        <StudenTab.Navigator screenOptions={{
            headerStyle : {
                backgroundColor : COLORS.primary,
            },
            headerTitleStyle : {
                color : COLORS.white
            },
            tabBarStyle : {
                backgroundColor : COLORS.primary
            },
            tabBarActiveTintColor : COLORS.yellow,
            headerLeft : () => {
                return (
                <TouchableOpacity style={{
                    marginLeft : 10
                }}
                onPress={() => navigation.openDrawer()}
                >
                    <Ionicon  name='menu-outline' size={30} color={COLORS.white}/>
                </TouchableOpacity>
                )
            }
            
        }}>
            <StudenTab.Screen name='StudentChallenger' component={Studentchallengerstack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Ionicon name="golf-outline" color={color} size={20} />
                ),
                headerShown : false,
                title : 'Thử thách'
                
            }}/>
            <StudenTab.Screen name='Done' component={Donescreen}
            options={{
                tabBarIcon :({color}) => (
                    <Ionicon name="checkbox-outline" color = {color}  size={20}/>
                ),
                title : 'Hoàn thành'
            }}/>
        </StudenTab.Navigator>
    )
}
