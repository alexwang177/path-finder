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

        newGrid[rowIndex][colIndex] === WALL ? 
          newGrid[rowIndex][colIndex] = EMPTY :
          newGrid[rowIndex][colIndex] = WALL
      }

      return {
        grid: newGrid
      }
    })
  }

  handleMouseDown = () => {
    this.setState({ mouseIsDown: true })
  }

  handleMouseUp = () => {
    this.setState({ mouseIsDown: false })
  }

  handleMouseEnter = (rowIndex, colIndex) => {
    if(!this.state.mouseIsDown) return

    this.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())

      if(prevState.marker === "wall") {

        newGrid[rowIndex][colIndex] === WALL ? 
          newGrid[rowIndex][colIndex] = EMPTY :
          newGrid[rowIndex][colIndex] = WALL
      }

      return {
        grid: newGrid
      }
    })
  }

  /*updateGrid = (rowIndex, colIndex, newNodeValue) => {
    this.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())
      newGrid[rowIndex][colIndex] = newNodeValue

      return {
        grid: newGrid
      }
    })

    console.log(this.state.grid)
  }*/

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
        <h1>{this.state.mouseIsDown ? "down" : "up"}</h1>
      </div>
    )
  }
}

export default App;
