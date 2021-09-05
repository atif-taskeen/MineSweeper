import React, { useState, useEffect } from "react";
import createBoard from "../../util/createBoard";
import Cell from "../Cell";
import { revealed } from "../../util/reveal";
import Modal from "../Modal";
import Header from "../Header";
import Menu from "../Menu";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flagCount, setFlagCount] = useState(15);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [gameType, setGameType] = useState('1');

  useEffect(() => {
    freshBoard();
    console.log(JSON.parse(localStorage.getItem('data')))
  }, []);

  useEffect(() => {
    let boardDimenssions = {}
    if (gameType === '1') {
      boardDimenssions = {
        height: 9,
        width: 9,
        mines: 10
      }
    } else if (gameType === '2') {
      boardDimenssions = {
        height: 16,
        width: 16,
        mines: 40
      }
    } else if (gameType === '3') {
      boardDimenssions = {
        height: 16,
        width: 30,
        mines: 99
      }
    }
    localStorage.setItem('data', JSON.stringify({
      ...boardDimenssions, 
      gameType: gameType
    }));
  }, [gameType]);

  const freshBoard = () => {
    const newBoard = createBoard(10, 15, 15);
    setNonMineCount(10 * 15 - 15);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const restartGame = () => {
    freshBoard();
    setGameOver(false);
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    setFlagCount(flagCount - 1)
    // to not have a dropdown on right click
    e.preventDefault();
    // Deep copy of a state
    let newGrid = JSON.parse(JSON.stringify(grid));
    //console.log(newGrid[x][y]);
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
  };

  return (
    <div style={{position: 'relative'}}>
      <Header 
        flagCount={flagCount} 
        gameOver={gameOver}
        showMenu={setMenuVisibility}
      />
      <Menu 
        showMenu={menuVisibility} 
        hideMenu={setMenuVisibility}
        gameTypeSetter={setGameType}
        gameType={gameType}
      />
      <div className="board-wrapper">
        {/* {gameOver && <Modal restartGame={restartGame} />} */}
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
