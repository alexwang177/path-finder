import React from 'react';

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

import './App.css'

class App extends React.Component {

  constructor() {
    super()

    const initRows = 28;
    const initCols = 64;

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
        /> 
      </div>
    )
  }
}

export default App;
