import React from 'react';
import {
  AppContainer,
} from './styles'
import {
  Column
} from './Column'
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { addList } from './state/actions';

export const App = () => {
  const { lists, dispatch } = useAppState()
  return (
    <AppContainer>
      {
        lists.map(list => (
          <Column text={list.text} id={list.id} key={list.id}></Column>
        ))
      }
      <AddNewItem onAdd={(text) => dispatch(addList(text))} toggleButtonText='+ Add another list' />
    </AppContainer>
  )
}
