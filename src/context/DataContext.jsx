import React, { useState, createContext } from "react";

export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [myUser, setMyUser] = useState(JSON.parse(localStorage.getItem("mini-chat-user")))

    const [currentChat, setCurrentChat] = useState("")
    const [previousChat, setPreviousChat] = useState(null)

    return (
        <DataContext.Provider value={{myUser, setMyUser, currentChat, setCurrentChat, previousChat, setPreviousChat}}>
            {children}
        </DataContext.Provider>
    )
}