import { DragItem } from "../DragItem"

export const isHidden = (
    draggedItem: DragItem | null,
    itemType: string,
    id: string
): boolean => {
    return Boolean(
        draggedItem &&
        draggedItem.id === id &&
        draggedItem.type === itemType
    )
}