import * as React from "react";
import ButtonAppBar from './AppBar';
import InputArea from './InputArea';
import RenderArea from "./RenderArea";
import "./App.css";
import { fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
    const [value, setValue] = React.useState("");
    const [view, setView] = React.useState('Edit');
    const [name, setName] = React.useState('New Note');

    const [filenames, setNames] = React.useState([]);

    
    React.useEffect(() => {
      if(read_cookie("files") == null) {
        save();
      }
      load(name);
      setNames(Object.keys(read_cookie("files")));
    }, []);

    const save = () => {
      let obj = read_cookie("files");
      obj = obj == null ? {} : obj;
      obj[name] = encodeURI(value);
      bake_cookie("files", obj, name);
      if(filenames.indexOf(name) == -1) {
        let new_names = [...filenames];
        new_names.push(name);
        setNames(new_names);
      }
    }

    const load = (newName) => {
      setName(newName);
      setValue(decodeURI(read_cookie("files")[newName]));    
    }

    const switchFocus = (event) => {
      setView(event);
    };

    function bake_cookie(name, value, filename) {
      var cookie = [name, '=', JSON.stringify(value)].join('');
      document.cookie = cookie;
      setName(filename);
    }

    function read_cookie(name) {
      var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
      if(result == null) {return null};
      return JSON.parse(result[1]);
     }

    

  return (
    <ThemeProvider theme={darkTheme}>

    <div className="App">
      <ButtonAppBar name = {name} setName = {setName} onSave = {save} switchFocus = {switchFocus} files = {filenames} onLoad = {load}/>
      {view == "Edit" ?       <InputArea value = {value} setValue = {setValue}/>
:       <RenderArea value = {value}/>
}
    </div>
    </ThemeProvider>

  );
}

export default App;
