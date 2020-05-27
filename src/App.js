import React from 'react';

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

import { START, END, WALL, VISITED, EMPTY} from './Constants/constants'

import './App.css'

class App extends React.Component {

  constructor() {
    super()

    const initRows = 10
    const initCols = 10

    this.state = {
      numRows: initRows,
      numCols: initCols,
      grid: this.createGrid(initRows, initCols),
      algorithm: "dfs",
      marker: "start",
      rowInput: "",
      colInput: ""
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

    return initGrid
  }

  handleFormChange = (e) => {

    const {name, value} = e.target

    if(name === "rowInput" || name === "colInput" || name === "algorithm" || name === "marker") {
      this.setState({ [name] : value })
    }
  }

  handleFormButton = (e) => {
    const {name} = e.target

    if(name === "sizeButton") {

      if(isNaN(this.state.rowInput) || isNaN(this.state.colInput) || this.state.rowInput === "" || this.state.colInput === ""){
        alert("Please enter a valid input.")
        return
      } 

      this.setState((prevState) => {
        return {
          numRows: prevState.rowInput,
          numCols: prevState.colInput,
          grid: this.createGrid(prevState.rowInput, prevState.colInput),
          rowInput: "",
          colInput: ""
        }
      })
    }
  }

  handleNodeClick = (rowIndex, colIndex) => {
    this.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())

      if(prevState.marker === "start") {
        for(let i = 0; i < newGrid.length; i++){
          for(let j = 0; j < newGrid[0].length; j++){
            if(newGrid[i][j] === START)
              newGrid[i][j] = EMPTY
          }
        }

        newGrid[rowIndex][colIndex] = START
      }
      else if(prevState.marker === "end") {
        for(let i = 0; i < newGrid.length; i++){
          for(let j = 0; j < newGrid[0].length; j++){
            if(newGrid[i][j] === END)
              newGrid[i][j] = EMPTY
          }
        }

        newGrid[rowIndex][colIndex] = END

      }
      else if(prevState.marker === "wall") {
        newGrid[rowIndex][colIndex] = WALL 
      }

      return {
        grid: newGrid
      }
    })
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
        />
        <Board 
          grid={this.state.grid} 
          numCols={this.state.numCols} 
          numRows={this.state.numRows}
          marker={this.state.marker}
          handleNodeClick={this.handleNodeClick}
        /> 
      </div>
    )
  }
}

export default App;
