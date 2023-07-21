import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import { useDispatch } from "react-redux";
import { addProject, updateProject } from '../../features/todo/todoSlice';

export default function AddNewProject({open, setopen, project, setProject}) {
  const [name, setName] = useState(() => (project ? project.name : ""));
  const [color, setColor] = useState(() => (project ? project.color : ""));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if(!name) return;
    project
    ? dispatch(updateProject({id: project.id, name, color }))
    : dispatch(addProject({name, color}));
    setName("")
    setColor("")
    setProject(""); 
    setopen(false);
  }
  
  const handleClose = () => {
    setName("")
    setColor("")
    setProject("");
    setopen(false);
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{mt: 2}}>
            <TextField
              label="Project Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={ project ? true : false}
            />
          </FormControl>
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              value={color}
              label="Color"
              variant='outlined'
              onChange={(e) => {setColor(e.target.value)}}
              inputProps={{ 
                style: { fontSize: '12px', fontWeight: '500' }  
            }}
            >
              {colors.map(({color, name}) => 
                <MenuItem key={name} value={color} sx={{fontSize: '12px'}}>
                  <CircleIcon sx={{color, fontSize: '12px', mr: 1}}/> {name}
                </MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Add project</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const colors = [
  {
    name: 'Red',
    color: '#FE0000',
  },
  {
    name: 'Orange',
    color: '#F29727',
  },
  {
    name: 'Yellow',
    color: '#F2BE22',
  },
  {
    name: 'Olive Green',
    color: '#7A9D54',
  },
  {
    name: 'Lime Green',
    color: '#BFDB38',
  },
  {
    name: 'Teal',
    color: '#35A29F',
  },
  {
    name: 'Sky Blue',
    color: '#00C4FF',
  },
  {
    name: 'Light Blue',
    color: '#99DBF5',
  },
  {
    name: 'Voilet',
    color: '#9336B4',
  },
  {
    name: 'Lavender',
    color: '#FFBDF7',
  },
  {
    name: 'Magenta',
    color: '#FF2171',
  },
  {
    name: 'Salmon',
    color: '#FF9EAA',
  },
  {
    name: 'Grey',
    color: '#B2B2B2',
  },
  {
    name: 'Taupe',
    color: '#D0B8A8',
  }
];