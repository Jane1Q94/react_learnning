import { nanoid } from 'nanoid';
import { DragItem } from '../DragItem';
import { findItemIndexById, insertItemAtIndex, removeItemAtIndex } from '../utils/arrayUtils';
import { Action } from "./actions";

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
            const moveListItem = draft.lists[fromIndex]
            const removeList = removeItemAtIndex(draft.lists, fromIndex)
            draft.lists = insertItemAtIndex(removeList, toIndex, moveListItem)
            break

        case 'SET_DRAGGED_ITEM':
            draft.draggedItem = action.payload
            break
        case 'MOVE_TASK':
            const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } = action.payload
            const sourceColumnIndex = findItemIndexById(draft.lists, sourceColumnId)
            const targetColumnIndex = findItemIndexById(draft.lists, targetColumnId)
            const draggedItemIndex = findItemIndexById(draft.lists[sourceColumnIndex].tasks, draggedItemId)
            const hoveredItemIndex = !!hoveredItemId ? findItemIndexById(draft.lists[targetColumnIndex].tasks, hoveredItemId) : 0
            const moveTaskItem = draft.lists[sourceColumnIndex].tasks[draggedItemIndex]
            draft.lists[sourceColumnIndex].tasks.splice(draggedItemIndex, 1)
            draft.lists[targetColumnIndex].tasks.splice(hoveredItemIndex, 0, moveTaskItem)
            break
    }
}