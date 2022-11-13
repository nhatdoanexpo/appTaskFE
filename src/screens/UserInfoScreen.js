import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import useIslogin from '../hooks/isLogIn';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from '@rneui/base/dist/Avatar/Avatar';
import DismissKeyboard from '../components/DismissView';
import Smalltext from '../components/SmallText';
import Backgroundview from '../components/BackgroundView';
import COLORS from '../constants/colors';
import Custombutton from '../components/CustomButton';
import {useSelector} from 'react-redux';

export default function Userinfoscreen(props) {
    const navigation = useNavigation()
    const isLogin = useIslogin()
    const {userRole,userInfo} = useSelector(state => state.user)
    const [isEdit, setisEdit] = useState(false)
    useEffect(() => {
        if (!isLogin) {
            // reset all stack navigation when logout
            navigation.reset({
                index: 0,
                routes: [{ name: 'StartScreen' }]
            })
        }
    }, [isLogin])

    return (
        <DismissKeyboard>
            <Backgroundview>
                <View style = {styles.wrapper}>
                    <View style={styles.avatarBox}>
                        <Avatar
                        size={200}
                        rounded
                        icon={{name : 'person' ,type : 'ionicons'}}
                        containerStyle= {{
                                backgroundColor : COLORS.primary
                            }}
                        />
                    </View>
                    <View style = {styles.infoBox}>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Tên :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{userInfo.name}</Smalltext>
                        </View>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Email :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{userInfo.email}</Smalltext>
                        </View>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Vai trò :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{
                                userRole === 'HV' ? 'Học viên' : userRole === 'GV'? 'Giảng viên' : 'Admin'
                            }</Smalltext>
                        </View>
                        <View style = {styles.btnBox}>
                        <Custombutton   btnTitle={'Chỉnh sửa'} 
                                        btnColor={COLORS.yellow} 
                                        btnHeight={15} titleColor={COLORS.pink}
                                        onPress={()=> setisEdit(true)}/>
                        </View>
                    </View>
                </View>
            </Backgroundview>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        // backgroundColor : 'red',
        height : '100%',
        marginVertical : 10,
        marginHorizontal : 20
    },
    avatarBox : {
        flex : 1,
        // backgroundColor : 'blue',
        justifyContent : 'center',
        alignItems : 'center'
    },
    infoBox : {
        flex : 2.5
    },
    infoContent : {
        paddingHorizontal : 30,
        paddingVertical : 5
    },
    btnBox : {
        marginTop : 10
    }
})
