import React, { createContext, FC, useContext } from 'react'

type Task = {
    id: string;
    text: string;
}

type List = {
    id: string;
    text: string;
    tasks: Task[];
}

export type AppState = {
    lists: List[]
}

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        },
        {
            id: "3",
            text: "review",
            tasks: [{ id: "r1", text: "react with typescript" }]
        }
    ]
}

type appStateContextProps = {
    lists: List[];
    getTasksById(id: string): Task[]
}

const AppStateContext = createContext<appStateContextProps>({} as appStateContextProps)

export const AppStateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { lists } = appData;
    const getTasksById = (id: string) => appData.lists.find(item => item.id === id)?.tasks || []
    return (
        <AppStateContext.Provider value={{ getTasksById, lists }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}