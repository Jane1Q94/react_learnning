import { DragItem } from "../DragItem"

export type Action =
    | {
        type: "ADD_LIST"
        payload: string
    }
    | {
        type: "ADD_TASK",
        payload: { text: string, listId: string }
    }
    | {
        type: "MOVE_LIST",
        payload: { fromId: string, toId: string }
    }
    | {
        type: "MOVE_TASK",
        payload: { draggedItemId: string, hoveredItemId: string | null, sourceColumnId: string, targetColumnId: string }
    }
    | {
        type: "SET_DRAGGED_ITEM",
        payload: DragItem | null
    }

export const addTask = (text: string, listId: string): Action => ({
    type: "ADD_TASK",
    payload: { text, listId }
})

export const addList = (text: string): Action => ({
    type: "ADD_LIST",
    payload: text
})

export const moveList = (fromId: string, toId: string): Action => ({
    type: "MOVE_LIST",
    payload: { fromId, toId }
})

export const moveTask = (draggedItemId: string, hoveredItemId: string | null, sourceColumnId: string, targetColumnId: string): Action => ({
    type: "MOVE_TASK",
    payload: { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId }
})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem
})