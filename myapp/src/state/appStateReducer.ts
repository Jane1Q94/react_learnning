import { nanoid } from 'nanoid';
import { findItemIndexById, insertItemAtIndex, removeItemAtIndex } from '../utils/arrayUtils';
import { Action } from "./actions";
import { DragItem } from '../DragItem';

export type Task = {
    id: string;
    text: string;
}

export type List = {
    id: string;
    text: string;
    tasks: Task[];
}

export type AppState = {
    lists: List[],
    draggedItem: DragItem | null
}

export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
    switch (action.type) {
        case 'ADD_LIST':
            draft.lists.push({
                id: nanoid(),
                text: action.payload,
                tasks: []
            })
            break
        case 'ADD_TASK':
            const { text, listId } = action.payload
            const targetListIndex = findItemIndexById(draft.lists, listId)
            draft.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text
            })
            break
        case 'MOVE_LIST':
            const { fromId, toId } = action.payload
            const fromIndex = findItemIndexById(draft.lists, fromId)
            const toIndex = findItemIndexById(draft.lists, toId)
            const item = draft.lists[fromIndex]
            const removeList = removeItemAtIndex(draft.lists, fromIndex)
            draft.lists = insertItemAtIndex(removeList, toIndex, item)
            break

        case 'SET_DRAGGED_ITEM':
            draft.draggedItem = action.payload
            break
    }
}