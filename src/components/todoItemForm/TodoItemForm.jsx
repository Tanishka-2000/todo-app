import { useState } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, Toolbar, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../features/todo/todoSlice";
import { useTheme } from '@emotion/react';

export default function TodoItemForm({ openForm, setOpenForm, todo}) {
  const [task, setTask] = useState(() => todo ? todo.task : "");
  const [description, setDescription] = useState(() => todo ? todo.description : "");
  const [project, setProject] = useState(() => todo ? todo.project : "Inbox");
  const [priority, setPriority] = useState(() => todo ? todo.priority : "");
  const [dueDate, setDueDate] = useState(() => todo ? todo.dueDate : Date.now());
  const dispatch = useDispatch();
  const theme = useTheme();
  const projects = useSelector(state => state.todo.projects);

  const handleSubmit = () => {
    if(!task) return;

    todo
    ? dispatch(updateTodo({
      ...todo,
      task,
      description,
      project,
      priority,
      dueDate: dueDate?.valueOf()
    }))
    : dispatch(addTodo({
      task,
      description,
      project,
      priority,
      dueDate: dueDate?.valueOf()
    }));
    setTask('');
    setDescription('')
    setProject('')
    setPriority('')
    setDueDate(Date.now())
    setOpenForm(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog fullWidth open={openForm} onClose={() => setOpenForm(false)}>
        <DialogContent>
            <TextField
                type='text'
                placeholder='Task Name'
                value={task}
                onChange={e => setTask(e.target.value)}
                variant='standard'
                fullWidth
                InputProps={{ 
                    disableUnderline: true,
                    style: { fontSize: '20px', fontWeight: '500', }  
                }} 
                   
            />
            <TextField
                type='text'
                placeholder='description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                variant='standard'
                fullWidth
                InputProps={{ 
                    disableUnderline: true,
                    style: {fontSize: '16px',}
                }}

            />
            <Toolbar disableGutters sx={{gap: '8px'}}>
                <FormControl fullWidth>
                  <DatePicker fullWidth label='Due Date' value={dueDate} onChange={newValue => setDueDate(newValue)}/>
                </FormControl>

              <FormControl fullWidth margin='dense'>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                  labelId='project-label'
                  id="project"
                  value={project}
                  label="Project"
                  onChange={(e) => setProject(e.target.value)}
                >
                  <MenuItem value="Inbox">Inbox</MenuItem>
                  { projects.map(({name}) => <MenuItem key={name} value={name}>{name}</MenuItem>) }
                </Select>
              </FormControl>

              <FormControl fullWidth margin='dense'>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId='priority-label'
                  id="priority"
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value={1} >Priority 1 <FlagIcon color='error' /></MenuItem>
                  <MenuItem value={2}>Priority 2 <FlagIcon color='warning'/></MenuItem>
                  <MenuItem value={3}>Priority 3 <FlagIcon color='success' /></MenuItem>
                  <MenuItem value={4}>Priority 4 <FlagIcon sx={{ color: 'darkBlue'}}/></MenuItem>
                </Select>
              </FormControl>

            </Toolbar>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} sx={{color: '#99627A'}}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained'>Add Task</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

// const projects = [
//   {
//       name: 'My Work',
//   },
//   {
//       name: 'Home',
//   },
//   {
//       name: 'Education',
//   },
//   {
//       name: 'School',
//   },
// ];