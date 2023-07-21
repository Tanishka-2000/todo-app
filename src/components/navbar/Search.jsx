import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    const [text, setText] = useState('');

    return(
        <TextField 
            id="search"
            label=""
            variant="filled"
            margin='normal'
            color='secondary'
            InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{color: '#fff'}}/>
                  </InputAdornment>
                ),
                disableUnderline: true,
                style:{ color: 'white'},
            }}
            sx={{ backgroundColor: '#ffffff20', marginRight: 'auto'}}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    )
}