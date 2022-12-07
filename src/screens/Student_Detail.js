import React, {useEffect, useState} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {PieChart} from 'react-native-chart-kit'
import Backgroundview from '../components/BackgroundView'
import PerformanceServices from '../services/performanceServices'
import COLORS from '../constants/colors';
import Smalltext from '../components/SmallText'
import Custominput from '../components/CustomInput';
import DismissKeyboard from '../components/DismissView';
import Custombutton from '../components/CustomButton';
import Loadingcontent from '../components/LoadingContent'


export default function StudentDetail({ route }) {
    const [statusData, setstatusData] = useState()
    const [list, setlist] = useState()
    const [remind, setremind] = useState(false)
    const [listDone, setlistDone] = useState()
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        PerformanceServices.getPerformanceByStudentID(route.params.studentData.id)
            .then(res => {
                const list = res.listPerfomace
                setlist(list)
                const listDone = res.listPerfomace.filter(
                    item => item.status === "Hoàn tất"
                )
                setlistDone(listDone)

                setstatusData(
                    [
                        { name: 'Chưa xong', length: list.length - listDone.length, color: COLORS.warning, legendFontColor: 'red', legendFontSize: 16, status: 1 },
                        { name: 'Hoàn tất', length: listDone.length, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 16, status: 2 }
                    ]
                )
                setisLoading(false)
            })
            .catch(err => console.log(err))
    }, [route.params.studentData])

    const handleRemind = () => {
        alert('Gui nhac nho cho hoc sinh')
        setremind(!remind)
    }
    if (isLoading) return <Loadingcontent loading={true}></Loadingcontent>

    return (
        <DismissKeyboard>
            <Backgroundview>
                <View style={styles.chartBox}>

                </View>
                {
                    statusData &&
                    (
                        <PieChart
                            data={statusData}
                            width={Dimensions.get('window').width}
                            height={250}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            accessor="length"
                            backgroundColor="transparent"
                            paddingLeft={15}
                        />
                    )
                }

                <View style={styles.detailBox}>
                    <Smalltext color={COLORS.text}>Tổng số thử thách đã gửi : {list?.length}</Smalltext>
                    <Smalltext color={'rgb(0, 0, 255)'}>Tổng số thử thách đã hoàn tất : {listDone?.length}</Smalltext>
                    <Smalltext color={COLORS.warning}>Tổng số thử thách đã chưa hoàn thành : {list?.length - listDone?.length}</Smalltext>
                    {
                        remind && (<>
                            <Smalltext>Lời nhắc :</Smalltext>
                            <Custominput multiline={true}
                                marginVertical={10} />
                            <Custombutton btnTitle={'Gửi'}
                                titleColor={COLORS.pink}
                                btnColor={COLORS.yellow}
                                btnHeight={30}
                                marginVertical={20}
                                marginHorizontal={50}
                                onPress={() => handleRemind()}

                            />
                        </>

                        )
                    }
                    {
                        !remind && (
                            <Custombutton btnTitle={'Nhắc nhở'}
                                titleColor={COLORS.pink}
                                btnColor={COLORS.yellow}
                                btnHeight={30}
                                marginVertical={20}
                                marginHorizontal={50}
                                onPress={() => setremind(true)}

                            />
                        )
                    }
                </View>
            </Backgroundview>
        </DismissKeyboard>

    )
}
const styles = StyleSheet.create({
    detailBox: {
        flex: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    chartBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})