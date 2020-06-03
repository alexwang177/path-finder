import React from 'react';
import ReactDOM from 'react-dom'

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

import { START, END, WALL, VISITED, EMPTY } from './Constants/constants'

import { handleMouseDown, handleMouseUp, handleMouseEnter, handleNodeClick, handleFormButton, handleFormChange } from './EventHandlers/App/appHandlers'
import { dfs, bfs, bidirectional, getPath } from './Algorithms/algorithms'
import { createGrid, clearVisited } from './GridFunctions/gridfunctions'
import { visualize } from './Visualize/visualize'
import { generateMaze } from './Algorithms/mazeAlgorithms'

import './App.css'

class App extends React.Component {

  constructor() {
    super()

    const initRows = 20
    const initCols = 50

    this.state = {
      numRows: initRows,
      numCols: initCols,
      grid: this.createGrid(initRows, initCols),
      algorithm: "dfs",
      maze: "rmd",
      marker: "start",
      speed: "moderate",
      rowInput: "",
      colInput: "",
      mouseIsDown: false,
      mazeIsGenerating: false
    }
  }

  // Initialize grid functions

  createGrid = (numRows, numCols) => createGrid(numRows, numCols)

  clearVisited = () => clearVisited(this)

  // Initialize event handlers

  handleFormChange = (e) => handleFormChange(e, this)

  handleFormButton = (e) => handleFormButton(e, this)

  handleNodeClick = (rowIndex, colIndex) => handleNodeClick(rowIndex, colIndex, this)

  handleMouseDown = () => handleMouseDown(this)

  handleMouseUp = () => handleMouseUp(this)

  handleMouseEnter = (rowIndex, colIndex) => handleMouseEnter(rowIndex, colIndex, this)

  // Initialize algorithms

  dfs = (startRow, startCol, endRow, endCol, visited) => dfs(startRow, startCol, endRow, endCol, visited, this)

  bfs = (startRow, startCol, endRow, endCol, visited) => bfs(startRow, startCol, endRow, endCol, visited, this)

  bidirectional = (startRow, startCol, endRow, endCol, visited) => bidirectional(startRow, startCol, endRow, endCol, visited, this)

  // Initialize visualize function

  visualize = () => visualize(this)

  // Initialize generateMaze function

  generateMaze = () => generateMaze(this)

  // Drag and Drop Start and End Nodes

  dragStart = (e) => {
    const target = e.target

    e.dataTransfer.setData("pointID", target.id)

    setTimeout(() => {
        target.style.display = "none"
    }, 0)

    setTimeout(() => {
        target.style.display = "block"
    }, 0)
  }

  drop = (e) => {
    e.preventDefault()

    this.clearVisited()

    const pointID = e.dataTransfer.getData("pointID")

    const point = document.getElementById(pointID)

    console.log(point)

    point.style.display = "block"

    const loc = e.target.id.split(" ")
    const row = loc[0]
    const col = loc[1]

    let pointRow = 0
    let pointCol = 0

    let pointValue = 0
    if(pointID === "start-point")
      pointValue = START
    else if(pointID === "end-point")
      pointValue = END

    for(let i = 0; i < this.state.grid.length; i++){
      for(let j = 0; j < this.state.grid[0].length; j++){
        if(this.state.grid[i][j] === pointValue) {
          pointRow = i
          pointCol = j
        }
      }
    }

    // Set previous start to nothing 
    // Set new position to start

    this.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())

      newGrid[pointRow][pointCol] = EMPTY
      newGrid[row][col] = pointValue

      return {
        grid: newGrid
      }
    })

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
          generateMaze={this.generateMaze}
        />
        <Board 
          grid={this.state.grid} 
          numCols={this.state.numCols} 
          numRows={this.state.numRows}
          marker={this.state.marker}
          speed={this.state.speed}
          handleNodeClick={this.handleNodeClick}
          handleMouseEnter={this.handleMouseEnter}
          updateGrid={this.updateGrid}
          mazeIsGenerating={this.state.mazeIsGenerating}
          drop={this.drop}
          dragStart={this.dragStart}
        />
      </div>
    )
  }
}

export default App;
