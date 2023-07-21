import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import isToday from 'date-fns/isToday'

import TodoItem from "./TodoItem";

export default function TodoList({ filter }) {
    const todos = useSelector(state => state.todo.list);
    const user = useSelector(state => state.todo.user);
    let filteredTodo;

    if(filter.type === 'project') filteredTodo = todos.filter(todo => todo.project === filter.name);
    else {
        if(filter === 'Inbox') filteredTodo = todos.filter(todo => todo.project === 'Inbox');
        else if(filter === 'Today') filteredTodo = todos.filter(todo => isToday(todo.dueDate));
        else if(filter === 'Anytime') filteredTodo = todos.filter(todo => !todo.dueDate);
        else if(filter === 'Upcoming') filteredTodo = todos.filter(todo => todo.dueDate);
        else filteredTodo = todos;
    }

    return(
        <Box sx={{mx: 2}}>
            <h5>{user?.email}</h5>
            {
                filteredTodo.map(todo => <TodoItem key={todo.id} todo={todo} />)
            }
        </Box> 
    )
}
