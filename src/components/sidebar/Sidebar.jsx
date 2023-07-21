import {  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import Snackbar from '@mui/material/Snackbar';

import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import AddNewProject from "./AddNewProject";
import { deleteproject } from "../../features/todo/todoSlice";

const drawerWidth = '300px';
export default function Sidebar({ DrawerOpen, setDrawerOpen, setFilter, openAlert }) {

    const matches = useMediaQuery('(max-width: 1024px)')
    const [checked, setChecked] = useState(true);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState(null);
    const projects = useSelector(state => state.todo.projects)
    const inbox = useSelector(state => state.todo.inbox)
    const dispatch = useDispatch();

    const changeFilter = (filter) => {
        setFilter(filter);
        if(matches) setDrawerOpen(false)
    }

    const handleProjectDelete = (e, id, total) => {
        e.stopPropagation();

        total > 0
        ? openAlert(true)
        : dispatch(deleteproject(id));

        setDrawerOpen(false);
    }

    const handleProjectEdit = (e, id, name, color) => {
        e.stopPropagation()
        setOpen(true);
        setProject({id, name, color});
    }

    return(
        <Drawer
            variant={matches ? 'temporary' : 'persistent'}
            open={DrawerOpen}
            transitionDuration={300}
            onClose={() => setDrawerOpen(false)}
            sx={{
                width: drawerWidth,
                flexShrink: '0',
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    top: 'auto'
                }
            }}
        >   
            {
                matches
                ?   <IconButton sx={{ml: 'auto'}} onClick={() => setDrawerOpen(false)}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                :   <br />
            }
            
            <List>
                {list.map( ({name, icon, color}) => 
                    <ListItem key={name} disablePadding>
                        <ListItemButton dense onClick={() => changeFilter({type: 'date', name})}>
                            <ListItemIcon sx={{color: color, minWidth: '35px'}}>{icon}</ListItemIcon>
                            <ListItemText primary={name} />
                            <Typography variant="caption" color='gray.main' >{name === 'Inbox' ? inbox : ''}</Typography>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <ListItem disablePadding>
                <Toolbar variant="dense" sx={{width: '100%', justifyContent: 'space-between', paddingLeft: '20px'}} disableGutters>
                    <Typography variant="subtitle2" color='gray.main' >Projects</Typography>
                    <Toolbar disableGutters>
                        <IconButton onClick={() => setOpen(true)} ><AddIcon /></IconButton>
                        {
                            checked
                            ? <IconButton onClick={() => setChecked(prev => !prev)}><KeyboardArrowUpIcon /></IconButton>
                            : <IconButton onClick={() => setChecked(prev => !prev)}><KeyboardArrowDownIcon /></IconButton>
                        }
                    </Toolbar>
                </Toolbar>
            </ListItem>

            {open && <AddNewProject open={open} setopen={setOpen} project={project} setProject={setProject}/>}

            <Collapse in={checked}>
                <List >
                    {projects.map( ({id, name, color, total}) => 
                        <ListItem key={name} disablePadding>
                            <ListItemButton dense sx={{'&:hover' : { '& svg': {opacity: 1}}}}  onClick={() => changeFilter({type: 'project', name})}>
                                <ListItemIcon sx={{color: color, minWidth: '35px'}}>
                                    <CircleIcon sx={{fontSize: '12px'}}/>
                                </ListItemIcon>
                                <ListItemText primary={name} />

                                <IconButton onClick={(e) => handleProjectEdit(e, id, name, color, total)}>
                                    <EditOutlinedIcon fontSize="small" sx={{opacity: 0}} color="gray"/>
                                </IconButton>

                                <IconButton onClick={(e) => handleProjectDelete(e, id, total)}>
                                    <DeleteOutlineIcon fontSize="small" sx={{opacity: 0}} color="gray"/>
                                </IconButton>

                                <Typography variant="caption" color='gray.main' >{total}</Typography>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </Drawer>
    )
}

///////////
export const list = [
    {
        name: 'Inbox',
        icon: <InboxOutlinedIcon />,
        color: '#75C2F6',
        total: 7,
    },
    {
        name: 'Today',
        icon: <TodayOutlinedIcon />,
        color: '#8EAC50',
    },
    {
        name: 'Upcoming',
        icon: <CalendarMonthOutlinedIcon />,
        color: '#9336B4',
    },
    {
        name: 'Anytime',
        icon: <LocalCafeOutlinedIcon />,
        color: '#F86F03'
    }
];