import { START, END, WALL, VISITED, EMPTY, PATH } from '../Constants/constants'

export const createGrid = (numRows, numCols) => {
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

  export const clearVisited = (app) => {

    app.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.map((element) => (element === VISITED || element === PATH) ? EMPTY : element))

      return {
        grid: newGrid
      }
    })
  }