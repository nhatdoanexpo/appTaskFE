import {useSelector} from "react-redux";

const jwtDecode = require('jwt-decode')

const useVerifyToken = () => {
    const token = useSelector(state => state.user.token)
    if (token) {

        const decoded = jwtDecode(token)
        return decoded.userID
    }
    return null

}


export default useVerifyToken;