import { START, END, WALL, VISITED, EMPTY } from '../Constants/constants'

export const visualize = (app) => {
    console.log("visualize")

    // Find Start Position (n^2) LOL
    let startRow = 0
    let startCol = 0

    for(let i = 0; i < app.state.numRows; i++){
      for(let j = 0; j < app.state.numCols; j++){
        if(app.state.grid[i][j] === START){
          startRow = i;
          startCol = j;
        }
      }
    }

    // Find End Position

    let endRow = 0
    let endCol = 0

    for(let i = 0; i < app.state.numRows; i++){
      for(let j = 0; j < app.state.numCols; j++){
        if(app.state.grid[i][j] === END){
          endRow = i;
          endCol = j;
        }
      }
    }

    const visited = []

    for(let i = 0; i < app.state.numRows; i++){
      const row = []
      for(let j = 0; j < app.state.numCols; j++){
        row.push(false)
      }
      visited.push(row)
    }

    app.clearVisited()

    if(app.state.algorithm === "dfs")
      app.dfs(startRow, startCol, endRow, endCol, visited)
    else if(app.state.algorithm === "bfs" || app.state.algorithm === "dijkstra")
      app.bfs(startRow, startCol, endRow, endCol, visited)
  }
