import { createContext } from "react";

const authContext = createContext({
    isLogin: '',
    token: '',
    setLogOut: () => { },
    setLogIn: () => { }
})

export default authContext