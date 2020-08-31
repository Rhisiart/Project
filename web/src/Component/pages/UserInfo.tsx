import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { getAccessToken} from "../../Api/AccessToken";

export const UserInfo : React.FC =  () => {
    const {user} = useAuth();
    const token = getAccessToken();

    return (
        <div>
            <div>
                <h2>id : {user?.id}</h2>
                <h2>email : {user?.email}</h2>
                <h2>token: {token}</h2>
            </div>
        </div>
    );
}