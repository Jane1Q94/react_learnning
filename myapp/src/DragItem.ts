export type ColumnDragItem = {
    id: string;
    text: string;
    type: "COLUMN"
}

export type TaskDragItem = {
    id: string;
    text: string;
    type: "TASK"
}

export type DragItem = ColumnDragItem | TaskDragItem