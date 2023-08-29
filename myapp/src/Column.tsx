import { useRef } from 'react';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { useAppState } from './state/AppStateContext';
import { addTask, moveList, moveTask, setDraggedItem } from './state/actions';
import {
    ColumnContainer,
    ColumnTitle,
} from './styles'
import { useItemDrag } from './utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { isHidden } from './utils/isHidden';

type ColumnProps = {
    id: string;
    text: string;
    isPreview?: boolean;
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksById, dispatch } = useAppState()
    const tasks = getTasksById(id)
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({
        type: "COLUMN",
        id,
        text
    })
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            }
            else if (draggedItem.type === "CARD") {
                if (draggedItem.columnId === id) {
                    return
                }
                if (tasks.length) {
                    return
                }
                dispatch(
                    moveTask(draggedItem.id, null, draggedItem.columnId, id)
                )
                dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
            }
        })
    })
    drag(drop(ref))
    return (
        <ColumnContainer
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
            isPreview={isPreview}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {
                tasks.map(task => (
                    <Card text={task.text} id={task.id} key={task.id} columnId={id} />
                ))
            }
            <AddNewItem dark onAdd={(text) => dispatch(addTask(text, id))} toggleButtonText='+ Add another card' />
        </ColumnContainer>
    )
}