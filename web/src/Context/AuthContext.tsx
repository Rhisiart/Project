import React, { createContext,useContext, useState, useEffect } from "react"
import { IPersonLogin, IUser } from "../Models/user";
import { LoginQuery, RevokeAccessTokenQuery, LogOutQuery } from "../Api/Queries";
import { setAccessToken} from "../Api/AccessToken";

interface IAuthContext {
    LogIn(user : IUser): Promise<void>;
    LogOut(): void;
    isLog: boolean;
    user: IPersonLogin | null;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider : React.FC = ({children}) => {
    const [user,setUser] = useState<IPersonLogin | null>(null);

    const refreshAccessToken = async () => {
        const response = await RevokeAccessTokenQuery();

        if(response && response.data && response.status === 200)
        {
            setUser(response.data.user);
            setAccessToken(response.data.access_token);
        }
    }

    useEffect(() => { refreshAccessToken() }, []);
    
    
    async function LogIn(user : IUser) {
        const response = await LoginQuery(user);

        if(response && response.data)
        {
            setAccessToken(response.data.token);
            setUser(response.data.user);
        }
    }

    function LogOut() {
        setUser(null);
        setAccessToken("");
        //LogOutQuery();
        console.log("User is logout");
    }

    return(
        <AuthContext.Provider value={{LogIn,LogOut,isLog : !!user, user}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

