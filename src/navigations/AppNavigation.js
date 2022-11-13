import {createStackNavigator} from '@react-navigation/stack';
import Startappscreen from '../screens/StartAppScreen';
import Loginscreen from '../screens/LoginScreen';
import Registerscreen from '../screens/RegisterScreen';
import Appdrawer from '../drawer/AppDrawer';
import {useDispatch} from 'react-redux';
import useGetItem from '../hooks/useGetItem';
import {useEffect, useState} from 'react';
import {addToken} from '../store/slices/auth/authSlice';
import Loadingcontent from '../components/LoadingContent';
import useVerifyToken from '../hooks/verifyToken';


const Stack = createStackNavigator();

function AppNavigation() {
    
    const dispatch = useDispatch()
    const token = useVerifyToken()
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        useGetItem('access_Token')
        .then(
            token => {
                dispatch(addToken({
                token : token
            }))
            setisLoading(false)
        }
        )
    }, [])
    if (isLoading) return <Loadingcontent loading={true}></Loadingcontent>

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
            initialRouteName={token ? 'Appdrawer' : 'StartScreen'}
        >
            <Stack.Screen name="StartScreen" component={Startappscreen} />
            <Stack.Screen name="LoginScreen" component={Loginscreen} />
            <Stack.Screen name="RegisterScreen" component={Registerscreen} />
            <Stack.Screen name="Appdrawer" component={Appdrawer} />
        </Stack.Navigator>
    );
}

export default AppNavigation