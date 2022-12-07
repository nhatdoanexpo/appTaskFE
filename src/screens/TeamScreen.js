import React, {useState} from 'react'
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import {useSelector} from 'react-redux'
import ItemBottomSheet from '../components/BottomSheet';
import Smalltext from '../components/SmallText';
import Ionicon from '@expo/vector-icons/Ionicons'
import Teamitem from '../components/TeamItem';
import Loadingcontent from '../components/LoadingContent';
import {useNavigation} from '@react-navigation/native';
import Custombutton from "../components/CustomButton";
import COLORS from "../constants/colors";
import getUserRole from "../hooks/getUserRole";
import AddClassModal from "../components/AddClassModal";
import AddStudentModal from "../components/AddStudentModal";

export default function Teamscreen(props) {
    const listClass = useSelector(state => state.class.listClass)
    const [isVisible_chooseClass, setisVisible_chooseClass] = useState(false)
    const [classInfo, setclassInfo] = useState()
    const navigation = useNavigation()
    const userRole = getUserRole()
    const [isShow, setIsShow] = useState(false)
    const chooseValue = value =>{
        setclassInfo(value)
    }
    // function render team item 
    const renderItem = ({item}) => {
        return <Teamitem item = {item} onClick={()=> navigation.navigate('StudentDetail',{
            studentData : item
        })}/>
    }

    const loading = useSelector(state => state.class.loading)
    return (
        <Loadingcontent loading={loading}>

            <View style={styles.container}>
                <ItemBottomSheet
                    listValue={listClass}
                    isVisible={isVisible_chooseClass}
                    offBottomSheet={()=> setisVisible_chooseClass(false)}
                    chooseValue={chooseValue}/>

                <View style={styles.dropDownClass}>
                    <View style={styles.className}>
                        <Smalltext>Lớp :</Smalltext>
                        <Smalltext color={COLORS.pink} bold={true}> {classInfo?.code}</Smalltext>
                    </View>
                    <TouchableOpacity style={styles.fillBox}
                                      onPress={() => setisVisible_chooseClass(true)}>
                        <Ionicon name='funnel-outline' size={25} style={styles.btnOpen} />
                    </TouchableOpacity>
                </View>
                <View style ={styles.listStudent}>
                    <FlatList
                        data = {classInfo ? classInfo.studentsDetail : []}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}/>
                </View>
            </View>

        </Loadingcontent>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dropDownClass: {
        flex : 1,
        marginVertical : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : 10,
        marginHorizontal : 10,
        borderWidth : 1,
        paddingHorizontal : 10
    },
    listStudent: {
        flex : 12,
        // backgroundColor: 'blue',
        height : '100%'
    },
    className : {
        flexDirection : 'row'
    },
    fillBox : {
        width : 50,
        height : 40,
        backgroundColor : COLORS.smallTxt,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    addNewBtn:{
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%'
    }
})