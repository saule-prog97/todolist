import React, {useState, ChangeEvent} from "react";
import TextField from "@material-ui/core/TextField";

type EditableSpanPropsType = {
    title: string
    addTask: (value: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState('')

    const activateViewMode = () => {
        setEditMode(false)
        props.addTask(title)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
        setTitle(text)
    }

    return (
        editMode ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/> : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}