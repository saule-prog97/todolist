import {TodolistType, ChangeTasksType, TasksStateType} from "../App";
import { v1 } from "uuid";
import {AddTodoListType, RemoveTodoListType} from "./todolists-reducer";

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListID: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListID: string
}


type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodoListType | RemoveTodoListType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            const stateCopy = {...state}
            let newState = state[action.todolistId].filter( f => f.id !== action.taskID )
            stateCopy[action.todolistId] = newState
            return stateCopy
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [
                {
                    id: v1(),
                    title: action.title,
                    isDone: false
                },
                ...tasks
            ]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let findID = copyState[action.todoListID].find( f => f.id === action.taskId )
            if(findID){
                findID.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let findID = copyState[action.todoListID].find( f => f.id === action.taskId )
            if(findID){
                findID.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type ")
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskID}
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): changeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListID}
}

// export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleType => {
//     return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id }
// }
//
// export const ChangeTodolistFilterAC = (id: string, filter: ChangeTasksType): ChangeTodoListFilterType => {
//     return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id }
// }
