import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({});
    const[user, setUser] = useState();

    useEffect(()=> {
        const userToken = localStorage.getItem("userToken");
        const usersStorage = localStorage.getItem("users_db");

        if(userToken && usersStorage){
            const currentUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );
            if(currentUser) setUser(currentUser[0]);
        }
    }, []);

    return <AuthContext.Provider>{children}</AuthContext.Provider>