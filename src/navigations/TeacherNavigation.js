import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ClassScreen from '../screens/ClassScreen';
import Ionicon from '@expo/vector-icons/Ionicons'
import Challengerstack from './ChallengerStack';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import TeamStack from './TeamStack';


const TeacherTab = createBottomTabNavigator()


export default function TeacherNavigation(props) {
    const navigation = useNavigation()


    return (
        <TeacherTab.Navigator screenOptions={{
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
            <TeacherTab.Screen name='Class' component={ClassScreen}
            options={{
                tabBarIcon : ({ color }) => (
                    <Ionicon name="apps-outline" color={color} size={20} />
                ) ,
                headerTitle : 'Danh sách lơp học',
                title : 'Lớp học',
            }}/>
            <TeacherTab.Screen name="ChallengerStack" component={Challengerstack}
            options={{
                headerShown : false,
                tabBarIcon: ({ color }) => (
                    <Ionicon name="golf-outline" color={color} size={20} />
                ),
                title : 'Thử thách'
            }}/>
            <TeacherTab.Screen name="Team" component={TeamStack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Ionicon name="people-outline" color={color} size={20} />
                ),
                headerShown : false
            }}/>
        </TeacherTab.Navigator>
    )
}
