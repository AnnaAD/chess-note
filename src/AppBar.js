import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import w_bishop from "./pieces/Chess_blt45.svg";



export default function ButtonAppBar(props) {
  const navItems = ['Edit', 'View'];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    if(item){
      props.onLoad(item);
    }
    setAnchorEl(null);
  };

  const handleCloseNo = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    props.setName(e.target.value)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
              Chess Notes
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick = {(e) => {props.switchFocus(item)}}>
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <TextField size = "small" id="outlined-basic" variant="outlined" value = {props.name} onChange = {handleChange} />
              <Button sx={{ color: '#fff' }} onClick = {props.onSave}>
                Save
              </Button>
              <Button
                sx={{ color: '#fff' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              Load
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseNo}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {
                props.files.map((item) => (
                  <MenuItem key = {item} onClick = {() => {handleClose(item)}}>{item}</MenuItem>
                ))
                }
              </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}