import {useSelector} from "react-redux"

export default function getClassUser() {
    const user = useSelector(state => state.user)
    if (user) {
        return user.listClassData;
    }
    return null
}