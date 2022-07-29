import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import board from "./pieces/Chessboard480.svg";
import b_pawn from "./pieces/Chess_pdt45.svg";
import w_pawn from "./pieces/Chess_plt45.svg";
import b_queen from "./pieces/Chess_qdt45.svg";
import w_queen from "./pieces/Chess_qlt45.svg";
import b_rook from "./pieces/Chess_rdt45.svg";
import w_rook from "./pieces/Chess_rlt45.svg";
import b_knight from "./pieces/Chess_ndt45.svg";
import w_knight from "./pieces/Chess_nlt45.svg";
import b_bishop from "./pieces/Chess_bdt45.svg";
import w_bishop from "./pieces/Chess_blt45.svg";
import b_king from "./pieces/Chess_kdt45.svg";
import w_king from "./pieces/Chess_klt45.svg";
import { color } from '@mui/system';
import ChessBoard from "./ChessBoard";
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Chess } from 'chess.js';


export default function GameBoard(props) {

  const [slide, setSlide] = React.useState(0);
  const pgn = props.pgn;
  console.log(pgn);
  const fens = [];

  const makeFens = () => {
    let chess = new Chess();
    chess.load_pgn(pgn); 
    let moves = chess.history();
    let chess1 = new Chess();
    moves.forEach((move) => {
      chess1.move(move);
      fens.push(chess1.fen());
    });
  }

  makeFens();


  const nextSlide = () => {
    setSlide(Math.min(slide + 1, fens.length-1));
  };

  const prevSlide = () => {
    setSlide(Math.max(slide - 1, 0));
  };
  
  return (
    
   <>
   <ChessBoard pos = {fens[slide]} view = {props.view}/>
   <Box p = {1} textAlign="center" width = {480*.6 - 15}>  <Button onClick = {prevSlide} variant = "contained"> <ArrowBackIosIcon/> </Button> <Button variant = "contained" onClick = {nextSlide}> <ArrowForwardIosIcon/> </Button>
</Box>
   </>
    
  );
}