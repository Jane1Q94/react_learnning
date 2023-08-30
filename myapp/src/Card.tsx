import { useRef } from 'react';
import { CardContainer } from './styles'
import { useItemDrag } from './utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import { useAppState } from './state/AppStateContext';
import { moveTask, setDraggedItem } from './state/actions';
import { isHidden } from './utils/isHidden';

type CardProps = {
    id: string;
    text: string;
    columnId: string;
    isPreview?: boolean
}

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
    const { draggedItem, dispatch } = useAppState()
    const { drag } = useItemDrag({
        type: 'CARD',
        id,
        text,
        columnId
    })
    const [, drop] = useDrop({
        accept: "CARD",
        // hover trigger drop action
        // TODO: drop when user release mouse
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type !== "CARD") {
                return
            }
            if (draggedItem.id === id) {
                return
            }
            dispatch(
                moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
            )
            dispatch(
                setDraggedItem({ ...draggedItem, columnId })
            )
        })
    })
    const ref = useRef<HTMLDivElement>(null)
    drop(drag(ref))
    return (
        <CardContainer
            ref={ref}
            isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
            isPreview={isPreview}
        >
            {text}
        </CardContainer>
    )
}