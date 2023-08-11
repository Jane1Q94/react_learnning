import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { useAppState } from './state/AppStateContext';
import { addTask } from './state/actions';
import {
    ColumnContainer,
    ColumnTitle,
} from './styles'

type ColumnProps = {
    id: string;
    text: string;
}

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksById, dispatch } = useAppState()
    const tasks = getTasksById(id)
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {
                tasks.map(task => (
                    <Card text={task.text} id={task.id} key={task.id} />
                ))
            }
            <AddNewItem dark onAdd={(text) => dispatch(addTask(text, id))} toggleButtonText='+ Add another card' />
        </ColumnContainer>
    )
}