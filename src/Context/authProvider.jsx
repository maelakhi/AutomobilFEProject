import { useReducer } from 'react';
import AuthContext from './authContext';

const defaultAuthState = {
    isLogin: true,
    token: '',
}

const authReducers = (state, action) => {
    if (action.type === 'LOGIN') {
        return {
            isLogin: true,
            token: action.value
        }
    }
    if(action.type === 'LOGOUT'){
        return{
            isLogin: false,
            token: action.value
        }
    }
}

const AuthProvider = ({children}) => {
    const [authState, dispatchAuthAction] = useReducer(authReducers, defaultAuthState);

    const handleLogOut = (value) => {
        dispatchAuthAction({type: 'LOGOUT', value: value})
    }

    const handleLogin = (value) =>{
        dispatchAuthAction({type: "LOGIN", value: value})
    }

    const authValue = {  
        token: authState.token,
        isLogin: authState.isLogin,
        setLogOut: handleLogOut,
        setLogIn: handleLogin
    }
  return (
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider