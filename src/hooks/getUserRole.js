import {useSelector} from "react-redux"

export default function getUserRole() {
    const user = useSelector(state => state.user)
    if (user) {
        return user.userRole;
    }
    return null
}