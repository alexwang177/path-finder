import React from 'react';

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

import './App.css'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      grid:  [[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]],
      numRows: 10,
      numCols: 10,
      algorithm: "dfs",
      marker: "start"
    }
  }

  render() {
    return (
      <div>
        <ControlBar/>
        <Board grid={this.state.grid}/> 
      </div>
    )
  }
}

export default App;
