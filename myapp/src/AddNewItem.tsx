import { useState } from 'react'
import { AddItemButton } from './styles'
import { NewItemForm } from './NewItemForm';

type AddNewItemProps = {
    dark?: boolean;
    onAdd(text: string): void;
    toggleButtonText: string;
}
export const AddNewItem = (props: AddNewItemProps) => {
    const { onAdd, dark, toggleButtonText } = props;
    const [showForm, setShowForm] = useState<boolean>(false);

    if (showForm) {
        return (
            <NewItemForm
                onAdd={(text) => {
                    onAdd(text)
                    setShowForm(false)
                }}
            />
        )
    }
    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}