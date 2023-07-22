import TodoItem from './TodoItem';
import isToday from 'date-fns/isToday'
import isThisWeek from 'date-fns/isThisWeek'
import isTomorrow from 'date-fns/isTomorrow'
import { Box } from '@mui/material';
import isFuture from 'date-fns/isFuture';


export default function Upcoming({ todos }) {

    const days = {
        today: [],
        tomorrow: [],
        thisWeek: [],
        nextWeek: [],
    }

    todos.forEach(todo => {
        if(isToday(todo.dueDate)) days.today.push(todo);
        else if(isTomorrow(todo.dueDate)) days.tomorrow.push(todo);
        else if(isThisWeek(todo.dueDate) && isFuture(todo.dueDate)) days.thisWeek.push(todo);
        else if(!isThisWeek(todo.dueDate) && isFuture(todo.dueDate)) days.nextWeek.push(todo);
    });

    return(
        <>
            <Box sx={{py:2}}>
                <h4>Today</h4>
                { days.today && days.today.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </Box>
            <Box sx={{py:2}}>
                <h4>Tomorrow</h4>
                { days.tomorrow && days.tomorrow.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </Box>
            <Box sx={{py:2}}>
                <h4>This Week</h4>
                { days.thisWeek && days.thisWeek.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </Box>
            <Box sx={{py:2}}>
                <h4>Next Week</h4>
                { days.nextWeek && days.nextWeek.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </Box>
        </>
    )
}
