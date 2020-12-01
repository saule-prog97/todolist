import {TodolistType, ChangeTasksType} from "../App";
import { v1 } from "uuid";

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: ChangeTasksType
}

type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ActionsType = RemoveTodoListType | AddTodoListType | ChangeTodoListFilterType | ChangeTodoListTitleType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            let newState = state.filter( f => f.id !== action.id)
            return [
                ...newState
            ]
        case 'ADD-TODOLIST':
            return [
                ...state,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: "all"
                }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let newTitle = state.find( f => f.id === action.id)
            if(newTitle) {
                newTitle.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let newFilter = state.find( f => f.id === action.id )
            if(newFilter){
                newFilter.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't understand this action type ")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListType => {
    return { type: "ADD-TODOLIST", title, todolistId: v1() }
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id }
}

export const ChangeTodolistFilterAC = (id: string, filter: ChangeTasksType): ChangeTodoListFilterType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id }
}
