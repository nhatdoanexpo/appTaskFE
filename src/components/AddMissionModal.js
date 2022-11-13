import React, {useState} from 'react'
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Smalltext from './SmallText';
import COLORS from '../constants/colors';
import Custominput from './CustomInput';
import DismissKeyboard from './DismissView';
import {useDispatch} from 'react-redux';
import {useValidate} from '../hooks/useValidate';
import {addMission} from '../store/slices/mission/missionAction';

export default function AddMissionModal({ isVisible, closeModal ,challengerID }) {
    const [des, setdes] = useState()
    const [note, setnote] = useState()
    const [validate, setvalidate] = useState({
        note: { isValid: true, error: '' },
        des: { isValid: true, error: '' },
    })

    const handleCancel = () => {
        closeModal()
    }
    const dispatch = useDispatch()
    const handleSave = () => {
            let validate = {
                des : useValidate('Mô tả',des),
                note : useValidate('Ghi chú',note)
            }
            setvalidate(validate)
        if (validate.des.isValid && validate.note.isValid ) {
                dispatch(addMission({
                    challengerID : challengerID,
                    des : des,
                    note : note
                })).then(
                    res => {
                        closeModal()
                    }
                ).catch(err => alert(err)) }

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
                        <Smalltext bold color={COLORS.pink}>Thêm nhiệm vụ</Smalltext>
                        <Custominput placeholder={'Mô tả'}
                            placeholderTextColor={COLORS.yellow}
                            marginVertical={10}
                            onChangeText={(value) => setdes(value)} />
                        {!validate.des.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.des.error}
                            </Smalltext>}
                        <Custominput placeholder={'Ghi chú'}
                            placeholderTextColor={COLORS.yellow}
                            onChangeText={(value) => setnote(value)} />
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

