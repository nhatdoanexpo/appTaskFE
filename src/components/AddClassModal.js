import React, {useState} from 'react'
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Smalltext from './SmallText';
import COLORS from '../constants/colors';
import Custominput from './CustomInput';
import DismissKeyboard from './DismissView';
import {useDispatch, useSelector} from 'react-redux';
import {useValidate} from '../hooks/useValidate';
import {showMessage} from 'react-native-flash-message';
import useVerifyToken from "../hooks/verifyToken";
import {addClass, getClassByMentor} from "../store/slices/class/classAction";

export default function AddClassModal({ isVisible, closeModal }) {

    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [note, setNote] = useState()
    const userID = useVerifyToken()
    const [validate, setvalidate] = useState({
        code: { isValid: true, error: '' },
        name: { isValid: true, error: '' },
        note: { isValid: true, error: '' }
    })

    const handleCancel = () => {
        closeModal()
    }
    const dispatch = useDispatch()
    const handleSave = () => {
        if (userID) {
            let validate = {
                code: useValidate('Mã', code),
                name: useValidate('Tên', name),
                note: useValidate('Ghi chú', note)
            }
            setvalidate(validate)
            if (validate.code.isValid && validate.name.isValid && validate.note.isValid ) {
                dispatch(addClass({
                    code : code,
                    name : name,
                    note : note,
                    mentor: userID
                })).then(
                    res => {
                        if (!res.error) {
                            showMessage({
                                message :'Notification!',
                                description : res.payload.message,
                                type : 'success'
                            })
                            dispatch(getClassByMentor({userID : userID}))
                            closeModal()
                        }else {
                            showMessage({
                                message : 'Notification',
                                description : res.error.message,
                                type : 'info'
                            })
                        }
                    }
                ).catch(err => alert(err))
            }
        } else {
            alert('Chưa chọn lớp để thêm thử thách')
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}

        >
            <DismissKeyboard>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Smalltext bold color={COLORS.pink}>Thêm Lớp</Smalltext>

                        <Custominput placeholder={'Mã'}
                                     placeholderTextColor={COLORS.yellow}
                                     marginVertical={10}
                                     onChangeText={(value) => setCode(value)} />
                        {!validate.code.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.code.error}
                            </Smalltext>}
                        <Custominput placeholder={'Tên'}
                            placeholderTextColor={COLORS.yellow}
                            marginVertical={10}
                            onChangeText={(value) => setName(value)} />
                        {!validate.name.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.name.error}
                            </Smalltext>}
                        <Custominput placeholder={'Ghi chú'}
                            placeholderTextColor={COLORS.yellow}
                            onChangeText={(value) => setNote(value)} />
                        {!validate.note.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.note.error}
                            </Smalltext>}
                        <View style={styles.btnBox}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleCancel()}
                            >
                                <Text style={styles.textStyle}>Huỷ</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => handleSave()}
                            >
                                <Text style={styles.textStyle}>Lưu</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        width: 100,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: COLORS.primary,
    },
    buttonClose: {
        backgroundColor: COLORS.warning,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    chooseType: {
        width: '87%',
        borderWidth: 1,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 15,
        borderColor: COLORS.pink,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    btnBox: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

