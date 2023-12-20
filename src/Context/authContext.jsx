import { createContext } from "react";

const authContext = createContext({
    isLogin: '',
    token: '',
    role:'',
    setLogOut: () => { },
    setLogIn: () => { }
})

export default authContext