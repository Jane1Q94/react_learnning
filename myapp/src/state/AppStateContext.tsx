import React, { createContext, Dispatch, FC, useContext } from 'react'
import { AppState, appStateReducer, List, Task } from './appStateReducer';
import { Action } from './actions';
import { useImmerReducer } from 'use-immer'
import { DragItem } from '../DragItem';


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
    ],
    draggedItem: null
}

type appStateContextProps = {
    lists: List[];
    getTasksById(id: string): Task[],
    dispatch: Dispatch<Action>,
    draggedItem: DragItem | null
}

const AppStateContext = createContext<appStateContextProps>({} as appStateContextProps)

export const AppStateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)
    const { draggedItem, lists } = state
    const getTasksById = (id: string) => lists.find(item => item.id === id)?.tasks || []
    return (
        <AppStateContext.Provider value={{ getTasksById, lists, draggedItem, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}