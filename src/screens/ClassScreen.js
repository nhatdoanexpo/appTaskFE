import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import useVerifyToken from '../hooks/verifyToken'
import {getClassByMentor} from '../store/slices/class/classAction';
import Loadingcontent from '../components/LoadingContent';
import Classitem from '../components/ClassItem';
import useIslogin from '../hooks/isLogIn';
import {useNavigation} from '@react-navigation/native';
import Custombutton from "../components/CustomButton";
import COLORS from "../constants/colors";
import AddClassModal from "../components/AddClassModal";
import getUserRole from "../hooks/getUserRole";

export default function ClassScreen(props) {
    const navigation = useNavigation()
    const userID = useVerifyToken()
    const isLogin = useIslogin()
    const userRole = getUserRole()
    const [isShow, setIsShow] = useState(false)
    useEffect(() => {
        if (!isLogin) {
            navigation.navigate('StartScreen')
        }
    }, [isLogin])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClassByMentor({userID}))
    }, [dispatch])

    const listClass = useSelector(state => state.class.listClass)
    const loading = useSelector(state => state.class.loading)
    const renderItem = ({item}) => {
        return <Classitem name={item.name} code={item.code} onClick={() => console.log(item._id)}/>
    }

    return (
    <Loadingcontent loading={loading}>
        <AddClassModal isVisible={isShow}
                            closeModal={() => setIsShow(false)}/>
        <View style ={styles.container} >
            <FlatList
            data={listClass}
            key={item => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}/>
        </View>

        {(userRole == 'GV') &&
        <Custombutton   btnTitle={'Thêm lớp'+userRole}
                        btnColor={COLORS.yellow}
                        titleColor={COLORS.text}
                        marginHorizontal={10}
                        marginVertical={10}
                        txtSize={20}
                        btnHeight={10}
                        onPress={() =>{
                            setIsShow(true)
                        } }/>}
    </Loadingcontent> 
    )
}
const styles = StyleSheet.create({
    container  :{
        flex : 1
    }
})