import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import ChessBoard from './ChessBoard';
import GameBoard from './GameBoard';

export default function RenderArea(props) {

  const mapToContent = (e) => {
    if(e.startsWith("##")) {
      return (<Typography variant="h5" m = {1} align="left">{e.substring(2)}</Typography>)
    }

    if(e.startsWith("\\embed")) {
      const re = 'fen="([^"]*)"'
      const match = e.match(re)
      if(match != null) {
        return (<ChessBoard pos = {match[1]}/>)
      } 
      const re2 = 'pgn="([^"]*)"'
      const match2 = e.match(re2)
      console.log(match2);
      return (<GameBoard pgn = {match2[1]}/>);
    }

    return(<Typography m = {1} align="left">{e}</Typography>)
  };

  console.log(props.value.split("\n"));
  return (
    <Box p = {3}>
    {props.value.split("\n").map(text =>   
      mapToContent(text)  
    )
    }
    </Box> 
  );
}