import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native'
import Custominput from '../components/CustomInput'
import Backgroundview from '../components/BackgroundView';
import Largetext from '../components/LargeText';
import DismissKeyboard from '../components/DismissView';
import Smalltext from '../components/SmallText';
import COLORS from '../constants/colors';
import Custombutton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../store/slices/auth/authAction';
import {showMessage} from 'react-native-flash-message';
import {useValidateEmail, useValidatePassword} from '../hooks/useValidate';
import Loadingcontent from '../components/LoadingContent';


export default function Loginscreen({navigation}) {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [validate, setvalidate] = useState({
        email : {isValid : true, error : ''},
        password : {isValid : true, error : ''}
    })
    const dispatch = useDispatch()

    // const userToken = useSelector(state => state.user.userToken)
    const handleLogin = () => {
        let validate = {
            email : useValidateEmail(email),
            password : useValidatePassword(password)
        }
        setvalidate(validate)
        if (validate.email.isValid &&validate.password.isValid) {
            dispatch(userLogin({ email: email.toLowerCase(), password: password }))
            .then(
                res => {
                    if (res.payload.success) {
                        showMessage({
                            message : 'Thông báo',
                            description : res.payload.message,
                            type : 'success'
                        })
                        navigation.replace('Appdrawer')
                    }else{
                        showMessage({
                            message :'Thông báo',
                            description : res.payload.message,
                            type : 'info'
                        })
                    }
                }
            ).catch(
                error => showMessage({
                    message : 'Warning',
                    description : error,
                    type : 'danger'
                })
            )
        }
    }
    const loading = useSelector(state => state.user.loading)
    return (
        <Loadingcontent loading = {loading}>
        <Backgroundview>
            <DismissKeyboard>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.header}>
                        <Largetext bold>Xin chào!</Largetext>
                        <Largetext>Chào mừng bạn quay trở lại</Largetext>
                    </View>
                    <View style={styles.inputContainer}>
                        <Custominput placeholder={'Email'} marginVertical={10}
                            onChangeText={(value) => setemail(value)} 
                            warning = {validate.email.isValid}/>
                            {!validate.email.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.email.error}
                            </Smalltext>}
                        <Custominput placeholder={'Mật khẩu'} marginVertical={10} password
                            onChangeText={value => setpassword(value)} 
                            warning = {validate.password.isValid}/>
                            {!validate.password.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.password.error}
                            </Smalltext>}
                        {/* <Smalltext align={'center'} color={'red'}>{message}</Smalltext> */}
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Smalltext align={'right'} bold>Tạo tài khoản ngay</Smalltext>
                        </TouchableOpacity>
                    </View>
                    <Custombutton btnTitle={'Đăng nhập'} titleColor={COLORS.white} btnColor={'#fd6b68'}
                        btnHeight={30} marginVertical={30} onPress={handleLogin} 
                        />
                </SafeAreaView>
            </DismissKeyboard>
        </Backgroundview>
        </Loadingcontent>

    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginHorizontal: 20
    },
    header: {
        marginTop: 20
    },
    inputContainer: {
        marginTop: 40
    }

})