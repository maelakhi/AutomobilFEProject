import { useReducer } from 'react';
import AuthContext from './authContext';

const defaultAuthState = {
    isLogin: false,
    token: '',
    role:''
}

const authReducers = (state, action) => {
    if (action.type === 'LOGIN') {
        return {
            isLogin: true,
            token: action.token,
            role: action.role
        }
    }
    if(action.type === 'LOGOUT'){
        return{
            isLogin: false,
            token: action.value,
            role: action.role
        }
    }
}

const AuthProvider = ({children}) => {
    const [authState, dispatchAuthAction] = useReducer(authReducers, defaultAuthState);

    const handleLogOut = (token, role) => {
        dispatchAuthAction({type: 'LOGOUT', token: token, role: role})
    }

    const handleLogin = (token, role) =>{
        dispatchAuthAction({type: "LOGIN", token: token, role: role})
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