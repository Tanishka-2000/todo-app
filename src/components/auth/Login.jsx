import { useState} from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/todo/todoSlice';

export default function LogInForm({open, setOpen}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if(!email || !password) return;
    console.log({email, password});
    dispatch(addUser({email, password}))
    setOpen(false)
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To save your todo list permanently, please log in with your username and password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Log In</Button>
        </DialogActions>
      </Dialog>
  );
}
