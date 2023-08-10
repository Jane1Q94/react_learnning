import React from 'react';
import {
  AppContainer,
} from './styles'
import {
  Column
} from './Column'
import { AddNewItem } from './AddNewItem';

export const App = () => {
  return (
    <AppContainer>
      <Column text='Todo:'></Column>
      <AddNewItem onAdd={console.log} toggleButtonText='+ Add another list' />
    </AppContainer>
  )
}
