import React from 'react';

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

import { START, END, WALL, VISITED, EMPTY} from './Constants/constants'

import { handleMouseDown, handleMouseUp, handleMouseEnter, handleNodeClick, handleFormButton, handleFormChange } from './EventHandlers/App/appHandlers'

import './App.css'

class App extends React.Component {

  constructor() {
    super()

    const initRows = 30
    const initCols = 60

    this.state = {
      numRows: initRows,
      numCols: initCols,
      grid: this.createGrid(initRows, initCols),
      algorithm: "dfs",
      marker: "start",
      rowInput: "",
      colInput: "",
      mouseIsDown: false
    }
  }

  createGrid = (numRows, numCols) => {
    const initGrid = []

    for(let i = 0; i < numRows; i++){
      const row = []
      for(let j = 0; j < numCols; j++){
        row.push(0)
      }
      initGrid.push(row)
    }

    const offset = Math.round(numCols / 4);
    initGrid[Math.round(numRows / 2)-1][offset] = START
    initGrid[Math.round(numRows / 2)-1][numCols - 1 - offset] = END

    return initGrid
  }

  handleFormChange = (e) => handleFormChange(e, this)

  handleFormButton = (e) => handleFormButton(e, this)

  handleNodeClick = (rowIndex, colIndex) => handleNodeClick(rowIndex, colIndex, this)

  handleMouseDown = () => handleMouseDown(this)

  handleMouseUp = () => handleMouseUp(this)

  handleMouseEnter = (rowIndex, colIndex) => handleMouseEnter(rowIndex, colIndex, this)

  // Visualize Function

  visualize = () => {
    console.log("visualize")

    // Find Start Position (n^2) LOL
    let startRow = 0
    let startCol = 0

    for(let i = 0; i < this.state.numRows; i++){
      for(let j = 0; j < this.state.numCols; j++){
        if(this.state.grid[i][j] === START){
          startRow = i;
          startCol = j;
        }
      }
    }

    const visited = []

    for(let i = 0; i < this.state.numRows; i++){
      const row = []
      for(let j = 0; j < this.state.numCols; j++){
        row.push(false)
      }
      visited.push(row)
    }

    this.dfs(startRow, startCol, visited)

  }

  dfs = (row, col, visited) => {
    if(row < 0 || col < 0 || row >= this.state.numRows || col >= this.state.numCols) return;

    if(visited[row][col]) return;

    visited[row][col] = true

    // Set current node to visited

    setTimeout(() => {

      this.setState((prevState) => {
        const newGrid = prevState.grid.map((row) => row.slice())
        newGrid[row][col] = VISITED
  
        return {
          grid: newGrid
        }
      }, () => {
        this.dfs(row - 1, col, visited)
        this.dfs(row + 1, col, visited)
        this.dfs(row, col - 1, visited)
        this.dfs(row, col + 1, visited)
      });

    }, 0);

    console.log("visited " + row + " " + col)
  }

  componentDidMount = () => {
    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    return (
      <div className="app">
        <ControlBar 
          rowInput={this.state.rowInput}
          colInput={this.state.colInput}
          handleFormButton={this.handleFormButton}
          handleFormChange={this.handleFormChange}
          algorithm={this.state.algorithm}
          marker={this.state.marker}
          visualize={this.visualize}
        />
        <Board 
          grid={this.state.grid} 
          numCols={this.state.numCols} 
          numRows={this.state.numRows}
          marker={this.state.marker}
          handleNodeClick={this.handleNodeClick}
          handleMouseEnter={this.handleMouseEnter}
          updateGrid={this.updateGrid}
        />
      </div>
    )
  }
}

export default App;
