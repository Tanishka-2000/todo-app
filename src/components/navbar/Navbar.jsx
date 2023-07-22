import {useState} from 'react'
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

import Search from './Search';
import LogInForm from '../auth/Login';
import './styles.css'


export default function Navbar({ setOpenSidebar, setOpenForm, isDarkTheme, setIsDarkTheme, setFilter}) {
    const [openAuth, setOpenAuth] = useState(false);
    const completed = useSelector(state => state.todo.completed);
    const total = useSelector(state => state.todo.total);

    return(
        <AppBar position='static'>
            <Toolbar sx={{gap: '10px', height:'50px'}}>

                <IconButton onClick={() => setOpenSidebar(prev => !prev)} >
                    <MenuIcon  color='secondary'/>
                </IconButton>
                
                <IconButton onClick={() => setFilter({name: "Todos"})}>
                    <HomeIcon color='secondary'/>
                </IconButton>
                
                <Search />
                
                <IconButton onClick={() => setOpenForm(true)}>
                    <AddIcon color='secondary'/>
                </IconButton>
                
                <Toolbar sx={{gap: '6px'}} disableGutters>
                    <TaskAltIcon />
                    <Typography>{completed}/{total}</Typography>
                </Toolbar>

                <IconButton onClick={() => setIsDarkTheme(prev => !prev)}>
                    {
                        isDarkTheme
                        ? <LightModeIcon color='secondary'/>
                        : <DarkModeIcon color='secondary'/>
                    }
                    
                </IconButton>

                <IconButton onClick={() => setOpenAuth(true)}>
                    <AccountCircleIcon color='secondary'/>
                </IconButton>

                {openAuth && <LogInForm open={openAuth} setOpen={setOpenAuth}/>} 

            </Toolbar>
        </AppBar>
    )
}