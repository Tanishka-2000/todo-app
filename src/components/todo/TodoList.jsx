import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import isToday from 'date-fns/isToday'

import TodoItem from "./TodoItem";
import TodoItemForm from "../todoItemForm/TodoItemForm";
import { useState } from "react";
import Upcoming from "./Upcoming";

export default function TodoList({ filter }) {
    const [isOpen, setIsOpen] = useState(false);
    const todos = useSelector(state => state.todo.list);
    const user = useSelector(state => state.todo.user);
    let filteredTodo;

    if(filter.type === 'project') filteredTodo = todos.filter(todo => todo.project === filter.name);
    else {
        if(filter.name === 'Inbox') filteredTodo = todos.filter(todo => todo.project === 'Inbox');
        else if(filter.name === 'Today') filteredTodo = todos.filter(todo => isToday(todo.dueDate));
        else if(filter.name === 'Anytime') filteredTodo = todos.filter(todo => !todo.dueDate);
        else if(filter.name === 'Upcoming') filteredTodo = todos.filter(todo => todo.dueDate);
        else filteredTodo = todos;
    }

    return(
        <Box sx={{mx: 2, py: 2}}>
            <h5>{user?.email}</h5>
            {
                filter.name === 'Upcoming'
                ? <Upcoming todos={filteredTodo} />
                : filteredTodo.map(todo => <TodoItem key={todo.id} todo={todo} />)
                    
                  
            }
            
            <Button onClick={() => setIsOpen(true)} variant="text"> + add todo</Button>
            <TodoItemForm openForm={isOpen} setOpenForm={setIsOpen}/>
        </Box> 
    )
}
