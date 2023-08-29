import { useDragLayer } from "react-dnd"
import { Column } from "./Column"
import { useAppState } from "./state/AppStateContext"
import { CustomDragLayerContainer, DragPreivewWrapper } from "./styles"

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))
    return draggedItem && currentOffset && (
        <CustomDragLayerContainer>
            <DragPreivewWrapper position={currentOffset}>
                <Column id={draggedItem.id} text={draggedItem.text} isPreview />
            </DragPreivewWrapper>
        </CustomDragLayerContainer>
    )
}