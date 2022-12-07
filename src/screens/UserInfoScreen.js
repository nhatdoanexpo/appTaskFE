import React, {useEffect, useState} from 'react'
import {PermissionsAndroid, StyleSheet, View} from 'react-native'
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
    const [image, setImage] = useState(false);

    const navigation = useNavigation()
    const isLogin = useIslogin()
    const {userRole,userInfo} = useSelector(state => state.user)
    const {email, name, role} = useSelector(state => state.user.user)
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


    const takeAndUploadPhotoAsync = () => {
      setImage(!image)
    } ;
    return (
        <DismissKeyboard>
            <Backgroundview>
                <View style = {styles.wrapper}>
                    <View style={styles.avatarBox}>

                        {image ? <Avatar
                            size={200}
                            rounded
                            source={{ uri: "https://randomuser.me/api/portraits/men/35.jpg" }}
                        /> :
                            <Avatar
                                size={200}
                                rounded
                                icon={{name : 'person' ,type : 'ionicons'}}
                                containerStyle= {{
                                    backgroundColor : COLORS.primary
                                }}
                            />
                        }

                    </View>
                    <View style = {styles.infoBox}>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Tên :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{ name}</Smalltext>
                        </View>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Email :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{ email}</Smalltext>
                        </View>
                        <View style={styles.infoContent}>
                            <Smalltext size={25}>Vai trò :</Smalltext>
                            <Smalltext size={25} color={COLORS.primary}>{
                                role === 'HV' ? 'Học viên' : role === 'GV'? 'Giảng viên' : 'Admin'
                            }</Smalltext>
                        </View>
                        <View style = {styles.btnBox}>
                        <Custombutton   btnTitle={  image ? 'Tắt':'Mở'}
                                        btnColor={COLORS.yellow} 
                                        btnHeight={15} titleColor={COLORS.pink}
                                        onPress={takeAndUploadPhotoAsync}/>
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
