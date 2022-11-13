import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import TeacherNavigation from '../navigations/TeacherNavigation';
import {useSelector} from 'react-redux';
import Studentnavigation from '../navigations/StudentNavigation';
import Drawercontent from './DrawerContent';
import Userinfoscreen from '../screens/UserInfoScreen';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import Ionicon from '@expo/vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';


const Drawer = createDrawerNavigator()
const LeftHeader = () => {
    const navigation = useNavigation()
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


export default function Appdrawer(props) {
    const userRole = useSelector(state => state.user.userRole)
    // const navigation = useNavigation()

    return (
        <Drawer.Navigator
            initialRouteName= {userRole === 'HV' ? 'StudentNavigation' : 'TeacherNavigation'}
            screenOptions={{
                headerShown: false,
                
            }}
            drawerContent={(props) => <Drawercontent {...props} />}>
            <Drawer.Screen name="UserInfo"
                component={Userinfoscreen}
                options={{
                headerShown : true,
                headerStyle : {
                    backgroundColor : COLORS.primary
                },
                headerTitleStyle : {
                    color : COLORS.white
                },
                title : 'Thông tin tài khoản',
                headerLeft : (...props) => {
                    return <LeftHeader/>
                    
                }
                }}
            />
            {
                userRole === 'HV' ?
                    <Drawer.Screen name='StudentNavigation'
                        component={Studentnavigation} 
                        options={{
                            // swipeEnabled : falses
                        }}/>
                    :
                    <Drawer.Screen name='TeacherNavigation' component={TeacherNavigation}
                    />
            }
        </Drawer.Navigator>
    )
}
