import React from 'react';

import ControlBar from './ControlBar/ControlBar'
import Board from './Board/Board'

class App extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <ControlBar />
        <Board /> 
      </div>
    )
  }
}

export default App;
