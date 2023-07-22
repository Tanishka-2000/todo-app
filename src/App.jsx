import { useState } from 'react'
import { Box, Typography, CssBaseline, Collapse, Snackbar, Toolbar } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Navbar, Sidebar, TodoList, TodoItemForm} from './components';

const dark = {
  palette:{
    mode: 'dark',
    primary: {
      main: '#99627A'
    },
    secondary:{
      main: '#fff'
    },
  
    gray:{
      main: '#888'
    },
  
    text: {
      primary: '#ccc',
      secondary: '#999'
    }
  }
}

const light = {
  palette:{
    mode: 'light',
    primary: {
      main: '#99627A'
    },
    secondary:{
      main: '#fff'
    },
  
    gray:{
      main: '#888'
    },
  
    text: {
      primary: '#555',
      secondary: '#999'
    }
  }
}


function App() {
  const [openTodoForm, setOpenTodoForm] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [filter, setFilter] = useState({name: 'Todos'});
  const matches = useMediaQuery('(max-width:1020px)');
 
  return (
   <div>
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar setOpenSidebar={setOpenSidebar} setOpenForm={setOpenTodoForm} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} setFilter={setFilter}/>

      <Box sx={{display: 'flex'}}>
        <Sidebar DrawerOpen={openSidebar} setDrawerOpen={setOpenSidebar} setFilter={setFilter} openAlert={setIsErrorAlertOpen}/>
        <Box 
          sx={{
            maxWidth: '700px',
            marginInline: 'auto',
            flex: '1',
            transition: 'all 300ms',
            transform: openSidebar || matches ? 'none' : 'translateX(-150px)',
          }}
          m={5}
        >
          <Toolbar  sx={{  mx: 2, justifyContent: 'space-between'}}>
            <Typography variant='h6' >{filter.name}</Typography>
            <Typography variant='body2'> {new Date().toString().slice(0, 15)}</Typography>
          </Toolbar>
          <hr />
          <TodoList filter={filter}/>
          {openTodoForm ? <TodoItemForm openForm={openTodoForm} setOpenForm={setOpenTodoForm}/> : ""}

        </Box>


      </Box>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={isErrorAlertOpen}
          autoHideDuration={4000}
          onClose={() => setIsErrorAlertOpen(false)}
          message="Coudn't delete project without deleting all its todos"
        />
    </ThemeProvider>
   </div>
  )
}

export default App
