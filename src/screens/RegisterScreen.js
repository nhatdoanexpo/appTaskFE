import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native'
import Custominput from '../components/CustomInput'
import Backgroundview from '../components/BackgroundView';
import Largetext from '../components/LargeText';
import DismissKeyboard from '../components/DismissView';
import Smalltext from '../components/SmallText';
import COLORS from '../constants/colors';
import Custombutton from '../components/CustomButton';
import {showMessage} from "react-native-flash-message";
import {useValidateEmail, useValidatePassword, useValidateRetypePass, useValidateUsername} from '../hooks/useValidate';
import Loadingcontent from '../components/LoadingContent';
import {useDispatch, useSelector} from 'react-redux';
import {userRegister} from '../store/slices/auth/authAction';

export default function Registerscreen({navigation}) {
    const [inputObj, setinputObj] = useState({
        name: '',
        email: '',
        password: '',
        retypePass: ''
    })
    const [validate, setvalidate] = useState({
        name : {isValid : true, error : ''},
        email : {isValid : true, error : ''},
        password : {isValid : true, error : ''},
        retypePass : {isValid : true, error : ''},
    })
    const dispatch = useDispatch()
    const handleRegister = () => {
        let validate = {
            name : useValidateUsername(inputObj.name),
            email : useValidateEmail(inputObj.email),
            password : useValidatePassword(inputObj.password),
            retypePass : useValidateRetypePass(inputObj.password,inputObj.retypePass)
        }
        setvalidate(validate)
        if (validate.name.isValid && validate.email.isValid && validate.password.isValid && validate.retypePass.isValid) {
            const {name,email,password} = inputObj
            dispatch(userRegister({name : name.toLowerCase(),email : email.toLowerCase(),password}))
            .then(
                res => {
                    if (!res.error) {
                        showMessage({
                            message :'Notification!',
                            description : res.payload.message,
                            type : 'success'
                        })
                        navigation.replace('LoginScreen')
                    }else {
                        showMessage({
                            message : 'Notification',
                            description : res.error.message,
                            type : 'info'
                        })
                    }
                }
            )
            .catch(
                err => alert(err)
            )
        }
    }
    const loading = useSelector(state => state.user.loading)

    return (
        <Loadingcontent loading={loading}>

        <Backgroundview>
            <DismissKeyboard>

                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.header}>
                        <Largetext bold>Xin chào!</Largetext>
                        <Largetext>Chào mừng bạn gia nhập cùng chúng tối!</Largetext>
                    </View>
                    <View style={styles.inputContainer}>
                        <Custominput placeholder={'Tên'} marginVertical={10}
                            onChangeText={(value) => setinputObj({ ...inputObj, name: value })}
                            warning={validate.name.isValid} />
                        {!validate.name.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.name.error}
                            </Smalltext>}
                        <Custominput placeholder={'Email'} marginVertical={10}
                            onChangeText={(value) => setinputObj({ ...inputObj, email: value })}
                            warning={validate.email.isValid} />
                        {!validate.email.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.email.error}
                            </Smalltext>}
                        <Custominput placeholder={'Mật khẩu'} marginVertical={10} password
                            onChangeText={(value) => setinputObj({ ...inputObj, password: value })}
                            warning={validate.password.isValid} />
                        {!validate.password.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.password.error}
                            </Smalltext>}
                        <Custominput placeholder={'Nhập lại mật khẩu'} marginVertical={10} password
                            onChangeText={(value) => setinputObj({ ...inputObj, retypePass: value })}
                            warning={validate.retypePass.isValid} />
                        {!validate.retypePass.isValid && 
                            <Smalltext color={COLORS.warning}>
                                {validate.retypePass.error}
                            </Smalltext>}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Smalltext align={'right'} bold>Về MH Đăng nhập</Smalltext>
                    </TouchableOpacity>
                    <Custombutton btnTitle={'Đăng ký'} titleColor={COLORS.white} btnColor={'#fd6b68'}
                        btnHeight={30} marginVertical={30} onPress={handleRegister} />
                        
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