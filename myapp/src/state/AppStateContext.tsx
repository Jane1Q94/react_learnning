import React, { createContext, Dispatch, FC, useContext, useEffect } from 'react'
import { AppState, appStateReducer, List, Task } from './appStateReducer';
import { Action } from './actions';
import { useImmerReducer } from 'use-immer'
import { DragItem } from '../DragItem';
import { save } from '../api';
import { withInitialState } from '../withInitialState';


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

type AppStateProviderProps = {
    children: React.ReactNode;
    initialState: AppState
}

const AppStateContext = createContext<appStateContextProps>({} as appStateContextProps)

const AppStateProviderWaitWrapped = ({ children, initialState }: AppStateProviderProps) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState)
    const { draggedItem, lists } = state
    const getTasksById = (id: string) => lists.find(item => item.id === id)?.tasks || []
    useEffect(() => {
        save(state)
    }, [state])
    return (
        <AppStateContext.Provider value={{ getTasksById, lists, draggedItem, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const AppStateProvider = withInitialState<AppStateProviderProps>(AppStateProviderWaitWrapped)

export const useAppState = () => {
    return useContext(AppStateContext)
}