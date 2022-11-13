import React, {useState} from 'react'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Backgroundview from '../components/BackgroundView';
import Largetext from '../components/LargeText';
import Smalltext from '../components/SmallText';
import {IMAGE} from '../constants/image';
import COLORS from '../constants/colors';
import Custombutton from '../components/CustomButton';
import useGetItem from '../hooks/useGetItem';


export default function Startappscreen({ navigation }) {
    const [token, settoken] = useState()
    useGetItem('access_Token').then(
        token => {
            settoken(token)
        }
    )
    return (
        <Backgroundview>
            <SafeAreaView style={styles.container}>
                <View style={styles.logo}>
                    <Image source={IMAGE.logo} style={styles.img} />
                </View>
                <View style={styles.content}>
                    <View>

                        <Largetext>Bắt đầu hành trình chinh phục</Largetext>
                        <View style={styles.smallText}>
                            <Smalltext align={'center'}>Khám phá sự thú vị của việc lập trình ngay nào !</Smalltext>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <Custombutton btnTitle={'Đăng ký'}
                            btnWidth={'50%'} btnColor={'white'} btnHeight={50}
                            pdH={30} borderRadius={15}
                            onPress={() => navigation.replace('RegisterScreen')}
                        />
                        <Custombutton btnTitle={'Đăng nhập'}
                            btnWidth={'50%'}
                            pdH={30}
                            onPress={() => navigation.replace('LoginScreen')} />
                    </View>
                </View>
            </SafeAreaView>
        </Backgroundview>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 30
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'space-around'
    },
    smallText: {
        marginTop: 20
    },
    btnContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.white,
        flexDirection: 'row',
        borderRadius: 15
    }
})
