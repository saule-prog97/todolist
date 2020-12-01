import React, {ChangeEvent} from "react";
import {ChangeTasksType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    nameTitle: string
    tasks: Array<TasksType>
    RemoveTask: (id: string, todoListId: string) => void
    addTask: (value: string, TodoListId: string) => void
    Change: (id: string, value: ChangeTasksType) => void
    changeStatus: (taskId: string, isDone: boolean, TodoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, TodoListId: string) => void
    filter: ChangeTasksType
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}


export const TodoList = (props: PropsType) => {

    const RemoveTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask=(title: string)=>{
        props.addTask(title, props.todoListId)
    }

    const ChangeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.nameTitle} addTask={ChangeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={RemoveTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((t) => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.todoListId)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.todoListId)
                        }
                        return <div className={t.isDone ? 'is-done'  : ''} >
                            <Checkbox key={t.id} checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} addTask={onChangeTitleHandler}/>
                            <IconButton aria-label="delete" onClick={() => props.RemoveTask(t.id, props.todoListId)}>
                                <Delete />
                            </IconButton>
                        </div>
                    })

                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => props.Change(props.todoListId,'all')}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => props.Change(props.todoListId,'active')}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => props.Change(props.todoListId,'completed')}>Completed</Button>
            </div>
        </div>
    );
}




