import React, {useState} from 'react'
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Smalltext from './SmallText';
import COLORS from '../constants/colors';
import Custominput from './CustomInput';
import DismissKeyboard from './DismissView';
import {useDispatch, useSelector} from 'react-redux';
import Ionicon from '@expo/vector-icons/Ionicons';
import ItemBottomSheet from './BottomSheet';
import {useValidate} from '../hooks/useValidate';
import {addChallenger, getChallengerByClass} from '../store/slices/challenger/challengerAction';
import {showMessage} from 'react-native-flash-message';

Ionicon

export default function Addchallengermodal({ isVisible, closeModal }) {

    const listType = useSelector(state => state.challenger.listType)
    const [isVisible_listType, setisVisible_listType] = useState(false)
    const [chooseType, setchooseType] = useState()
    const [name, setname] = useState()
    const [note, setnote] = useState()
    const [validate, setvalidate] = useState({
        name: { isValid: true, error: '' },
        note: { isValid: true, error: '' },
        type : {isValid : true, error: ''}
    })
    const currentClassID = useSelector(state => state.class.currentClassID)
    const handleChooseType = (type) => {
        setchooseType(type)
    }
    const handleCancel = () => {
        setchooseType()
        closeModal()
    }
    const dispatch = useDispatch()
    const handleSave = () => {
        if (currentClassID) {
            let validate = {
                type : {
                    isValid : chooseType ? true : false,
                    error : chooseType ? '' : 'Chưa chọn loại TT'
                },
                name: useValidate('Tên', name),
                note: useValidate('Ghi chú', note)
            }
            setvalidate(validate)
            if (validate.name.isValid && validate.note.isValid && validate.type.isValid) {
                dispatch(addChallenger({
                    classID : currentClassID,
                    typeID : chooseType._id,
                    name : name,
                    note : note
                })).then(
                    res => {
                        if (!res.error) {
                            showMessage({
                                message :'Notification!',
                                description : res.payload.message,
                                type : 'success'
                            })
                            dispatch(getChallengerByClass({classID : currentClassID}))
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
            {/* Bottom Sheet Loai Thu thach */}
            <ItemBottomSheet isVisible={isVisible_listType}
                offBottomSheet={() => setisVisible_listType(false)}
                chooseValue={handleChooseType}
                listValue={listType} />
            <DismissKeyboard>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Smalltext bold color={COLORS.pink}>Thêm thử thách</Smalltext>
                        <TouchableOpacity style={styles.chooseType} onPress={() => setisVisible_listType(true)}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {
                                    !chooseType ?
                                        <Smalltext>Loại TT:</Smalltext>
                                        : <Smalltext color={COLORS.pink} bold> {chooseType?.shortname}</Smalltext>

                                }
                            </View>
                            <View><Ionicon name='caret-down-outline' size={25} /></View>
                        </TouchableOpacity>
                        {!validate.type.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.type.error}
                            </Smalltext>}
                        <Custominput placeholder={'Tên'}
                            placeholderTextColor={COLORS.yellow}
                            marginVertical={10}
                            onChangeText={(value) => setname(value)} />
                        {!validate.name.isValid &&
                            <Smalltext color={COLORS.warning}>
                                {validate.name.error}
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

