import { Box, Toolbar, Checkbox, Typography, ButtonGroup, IconButton } from '@mui/material';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleTodo, deleteTodo } from '../../features/todo/todoSlice';
import TodoItemForm from '../todoItemForm/TodoItemForm'

export default function TodoItem({ todo }) {
    const [checked, setChecked] = useState(todo.completed);
    const [editForm, setEditForm] = useState(false);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(toggleTodo(todo.id))
        setChecked(prev => !prev);
    }

    return(
        <Box sx={{ borderBottom: '1px solid #ccc'}}>
            <Toolbar sx={{'&:hover': {'& .MuiButtonGroup-root': { opacity: 1}}}}>
                <Checkbox
                    sx={{alignSelf: 'start'}}
                    icon={<CircleTwoToneIcon sx={{ color: todo.priority ? priority[todo.priority] : '#888' }} />}
                    checkedIcon={<CheckCircleOutlinedIcon sx={{ color: todo.priority ? priority[todo.priority] : '#888' }}/>}
                    checked={checked}
                    onChange={handleChange}
                />
                <Box py={.8} sx={{flex: 1}}>
                    <Typography variant='body1' sx={{textDecoration: checked && 'line-through'}} >{todo.task}</Typography>
                    <Typography variant='body2'color='gray.main' sx={{textDecoration: checked && 'line-through'}} >{todo.description}</Typography>
                    { todo.dueDate && <Typography variant='caption' color='gray.main'><EventOutlinedIcon fontSize='small' /> {new Date(todo.dueDate).toDateString().slice(4, 10)}</Typography>}
                </Box>  
                <Box sx={{ textAlign: 'end' }}>
                    <ButtonGroup sx={{opacity: 0}}>
                        <IconButton onClick={() => setEditForm(true)} ><EditOutlinedIcon color='gray' /></IconButton>
                        <IconButton onClick={() => setEditForm(true)}><DateRangeOutlinedIcon color='gray'/></IconButton>
                        <IconButton onClick={() => dispatch(deleteTodo(todo.id))}><DeleteOutlinedIcon color='gray'/></IconButton>
                    </ButtonGroup>
                    <Box>
                        <Typography variant='caption' ><i>{todo.project}</i></Typography>
                    </Box>
                </Box>
                {   editForm 
                    ? <TodoItemForm openForm={editForm} setOpenForm={setEditForm} todo={todo}/>
                    : ''
                }
            </Toolbar>
       </Box>
    )
}

const priority = {
    1: 'red',
    2: 'orange',
    3: 'green',
    4: 'darkBlue',
}