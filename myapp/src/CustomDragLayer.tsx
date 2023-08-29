import { useDragLayer } from "react-dnd"
import { Column } from "./Column"
import { useAppState } from "./state/AppStateContext"
import { CustomDragLayerContainer, DragPreivewWrapper } from "./styles"
import { Card } from "./Card"

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))
    return draggedItem && currentOffset && (
        <CustomDragLayerContainer>
            <DragPreivewWrapper position={currentOffset}>
                {
                    draggedItem.type === "COLUMN" ? (
                        <Column id={draggedItem.id} text={draggedItem.text} isPreview />
                    ) : (
                        <Card id={draggedItem.id} text={draggedItem.text} columnId={draggedItem.columnId} isPreview />
                    )
                }
            </DragPreivewWrapper>


        </CustomDragLayerContainer>

    )
}