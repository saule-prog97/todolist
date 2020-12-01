import React, {useDebugValue, useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export type ChangeTasksType = 'all' | 'completed' | 'active'

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type TodolistType = {
    id: string
    title: string
    filter: ChangeTasksType
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'HTML', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bred', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Meat', isDone: true}
        ]
    })

    const ChangeFilter = (id: string, value: ChangeTasksType) => {
        let findTodoList = todoLists.find((tl) => tl.id === id)
        if (findTodoList) {
            findTodoList.filter = value
        }

        setTodoList([...todoLists])
    }

    const changeStatus = (taskId: string, isDone: boolean, TodoListId: string) => {
        let taskNew = tasks[TodoListId]
        let task = taskNew.find(t => t.id === taskId)

        console.log(task)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }


    const RemoveTask = (id: string, todoListId: string) => {
        let task = tasks[todoListId]
        let filteredTasks = task.filter(ft => ft.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    const addTask = (value: string, todoListId: string) => {
        let newTask = {
            id: v1(),
            title: value,
            isDone: false
        }
        let task = tasks[todoListId]
        let newTasks = [
            ...task,
            newTask
        ]
        tasks[todoListId] = newTasks
        setTasks({...tasks})

    }
    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoList([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }

    const changeTaskTitle = (taskId: string, newTitle: string, TodoListId: string) => {
        let taskNew = tasks[TodoListId]
        let task = taskNew.find(t => t.id === taskId)

        console.log(task)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasks})
    }

    const changeTodoListTitle = (id: string, title: string) => {
        let todoList = todoLists.find(t => t.id === id)
        if (todoList) {
            todoList.title = title
            setTodoList([...todoLists])
        }

    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {

                            let tasksForToDoList = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                            } else if (tl.filter === 'active') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                    <TodoList
                                        key={tl.id}
                                        nameTitle={tl.title}
                                        tasks={tasksForToDoList}
                                        RemoveTask={RemoveTask}
                                        addTask={addTask}
                                        Change={ChangeFilter}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        todoListId={tl.id}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}


export default App;
