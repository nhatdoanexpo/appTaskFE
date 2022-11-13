import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';
import useIslogin from '../hooks/isLogIn';
import Ionicon from '@expo/vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import Teamscreen from '../screens/TeamScreen';
import StudentDetail from '../screens/Student_Detail';

const ChallengerStack = createStackNavigator()


export default function TeamStack(props) {
    const isLogin = useIslogin()
    const navigation = useNavigation()
    useEffect(() => {
        if (!isLogin) {
            // reset all stack navigation when logout
            navigation.reset({
                index : 0,
                routes : [{name : 'StartScreen'}]
            })
        }
    }, [isLogin])

    return (
        <ChallengerStack.Navigator 
        screenOptions={{
            headerStyle : {
                backgroundColor : COLORS.primary,
            },
            headerTitleStyle : {
                color : COLORS.white
            },
            tabBarStyle : {
                backgroundColor : COLORS.primary
            },
            tabBarActiveTintColor : COLORS.yellow
        }}
        >
            <ChallengerStack.Screen name='TeamScreen' component={Teamscreen}
                                    options={{
                                        title : 'Danh sách học sinh',
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
                                    }}/>
            <ChallengerStack.Screen name='StudentDetail' component={StudentDetail}
                                    options={({route})=> (
                                        {
                                            title : `Chi tiết : ${route.params.studentData.name}`
                                            
                                        }
                                    )}
                                    />
        </ChallengerStack.Navigator>
    )
}
