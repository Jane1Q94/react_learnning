import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { useAppState } from './state/AppStateContext';
import {
    ColumnContainer,
    ColumnTitle,
} from './styles'

type ColumnProps = {
    id: string;
    text: string;
}

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksById } = useAppState()
    const tasks = getTasksById(id)
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {
                tasks.map(task => (
                    <Card text={task.text} id={task.id} key={task.id} />
                ))
            }
            <AddNewItem dark onAdd={console.log} toggleButtonText='+ Add another card' />
        </ColumnContainer>
    )
}