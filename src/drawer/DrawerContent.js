import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {LinearGradient} from 'expo-linear-gradient'
import React, {useState} from 'react'
import {Alert, Image, StyleSheet, Text, View} from 'react-native'
import {IMAGE} from '../constants/image'
import Ionicon from '@expo/vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../store/slices/auth/authSlice'

export default function Drawercontent(props) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const userRole = useSelector(state => state.user.userRole)
    const defautlScreen = userRole !== 'HV' ? 'TeacherNavigation' : 'StudentNavigation'
    const [active, setactive] = useState(defautlScreen)
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#dfe4ea', '#f1f2f6', '#ffffff']}
                style={styles.background}
            />
            <View style={styles.header}>
                <View style={styles.headerImg}>
                    <Image source={IMAGE.logo} style={{
                        width: 150,
                        height: 150,
                        borderRadius: 15
                    }} />
                </View>
            </View>
            <DrawerContentScrollView style={styles.scrollDrawer}>
                <DrawerItem
                    focused={active === 'UserInfo' ? true : false}
                    label={'Thông tin tài khoản'}
                    icon={({ size, color }) => (<Ionicon name='person-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('UserInfo')
                        navigation.navigate('UserInfo')
                    }}
                    activeTintColor='#40407a'
                />
                {
                    userRole !== 'HV' ?
                    (
                    <DrawerItem
                    focused={active === 'TeacherNavigation' ? true : false}
                    label={'Giáo viên - Quản lý'}
                    icon={({ size, color }) => (<Ionicon name='book-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('TeacherNavigation')
                        navigation.navigate('TeacherNavigation')
                    }}
                    activeTintColor='#40407a'
                />
                    ) :
                    (
                    <DrawerItem
                    focused={active === 'StudentNavigation' ? true : false}
                    label={'Học viên - Quản lý'}
                    icon={({ size, color }) => (<Ionicon name='book-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('StudentNavigation')
                        navigation.navigate('StudentNavigation')
                    }}
                    activeTintColor='#40407a'
                />
                    )
                }
                
                <DrawerItem
                    focused={active === 'Logout' ? true : false}
                    style={{
                        backgroundColor: '#ff7675'
                    }}
                    label={'Đăng xuất'}
                    icon={({ size, color }) => (<Ionicon name='log-out-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('Logout')
                        Alert.alert(
                            "Cảnh báo",
                            "Bạn thật sự muốn đăng xuất ?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                                {
                                    text : 'OK',
                                    onPress : () => {
                                        dispatch(logOut())
                                        // navigation.replace('StartScreen')
                                    },
                                }
                            ],
                        );
                    }}
                    activeTintColor='#40407a'
                />



            </DrawerContentScrollView>
            <View style={styles.closeDrawer}>
                <Text>©Copyright ... 2022 </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    header: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg: {
        justifyContent: 'center',
        alignItems: 'center'

    }
    ,
    scrollDrawer: {
        backgroundColor: 'cyan',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    closeDrawer: {
        width: '100%',
        backgroundColor: '#33d9b2',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})