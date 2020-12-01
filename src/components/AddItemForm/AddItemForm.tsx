import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField, IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
type addItemFormPropsType = {
    addItem: (value: string) => void
}
export const AddItemForm = (props: addItemFormPropsType) => {
    const [initial, setInitial] = useState('')
    let [error, setError] = useState<string | null>(null)
    const newMessage = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value
        setInitial(newText)
    }
    const addTasks = () => {
        if (initial.trim() === '') {
            return setError('Нельзя добавить пустое задание')
        }
        props.addItem(initial)
        setInitial('')
    }
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (initial.trim() === '') {
            return
        }
        if (e.key === 'Enter') {
            props.addItem(initial)
        }
    }
    return(
        <div>
            <TextField error={!!error} helperText={error} variant={"outlined"} label={'Введите значение'} value={initial} onChange={newMessage} onKeyPress={pressEnter}/>
            <IconButton onClick={addTasks}><ControlPoint/></IconButton>
        </div>
    )
}