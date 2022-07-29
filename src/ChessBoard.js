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


export default function ChessBoard(props) {

  const mulFactor = .6;
  
  const charToHtml = (sym, row, col, whitePov) => {

    let piece = b_pawn;
    console.log(sym);
    switch(sym) {
      case "p": piece = b_pawn; break;
      case "P": piece = w_pawn;break;
      case "q": piece = b_queen;break;
      case "Q": piece = w_queen; break;
      case "k": piece = b_king;break;
      case "K": piece = w_king;break;
      case "r": piece = b_rook;break;
      case "R": piece = w_rook; break;
      case "n": piece = b_knight;break;
      case "N": piece = w_knight;break;
      case "b": piece = b_bishop;break;
      case "B": piece = w_bishop;break;
    }

    if(whitePov) {
      return (<img src = {piece} key = {row*8+col} width = {60*mulFactor} style = {{position: "absolute", top: 60*row*mulFactor, left: 60*col*mulFactor}}/>);
    }

    return (<img src = {piece} width = {60*mulFactor} key = {row*8+col} style = {{position: "absolute", bottom: 60*row*mulFactor, right: 60*col*mulFactor}}/>);
      
    
  }
  
  const stringToHtml = (fen) => {

    let parts = fen.split(" ")
    let output = [];
    let i = 0;
    let j = 0;

    let rows = parts[0].split("/");
    let colorToMove = parts[1];
    let symb = [];
    rows.forEach(element => {
      symb.push(element.trim().split(""))
    });

    symb.forEach((rowList,row) => {
      let col = 0;
      rowList.forEach((char) => {
        if("pPbBnNqQkKrR".includes(char)) {
          output.push(charToHtml(char,row,col, props.view != "Black"));
          col += 1;
        } else {
          col += parseInt(char);
        }
      });
    });

    return output
    
  }

  return (
    
    <div style = {{position: "relative", top: 0, left: 0, height: 480*mulFactor, width: 480*mulFactor}}>
      <img src = {board} width = {480*mulFactor}/>
      {stringToHtml(props.pos)}
    </div>
    
  );
}