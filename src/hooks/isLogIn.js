import {useSelector} from "react-redux"

export default function useIslogin() {
    const user = useSelector(state => state.user)
    if (!user.isLogin && !user.token) {
        return false
    }
    return true
}
