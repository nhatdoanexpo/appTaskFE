import React from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'
import StudentPerformitem from '../components/Student_PerformItem'

export default function Donescreen(props) {
    
    const listDone = useSelector(state => state.performance.listDone)
    const renderItem = ({item}) => {
        return <StudentPerformitem item={item} noPress/>
    }
    return (
        <FlatList
        data={listDone}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        />
    )
}
