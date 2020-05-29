import { START, END, WALL, VISITED, EMPTY } from '../Constants/constants'

export const dfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let stack = []
    stack.push([startRow, startCol])

    while(stack.length !== 0) {
      const loc = stack.pop()
      const row = loc[0]
      const col = loc[1]

      if(row < 0 || col < 0 || row >= app.state.numRows || col >= app.state.numCols) continue

      if(visited[row][col]) continue

      if(app.state.grid[row][col] === WALL) continue

      visited[row][col] = true

      if(row === endRow && col === endCol) return

      if(row !== startRow || col !== startCol) {
        // set node to visited
        setTimeout(() => app.setState((prevState) => {
          const newGrid = prevState.grid.map((row) => row.slice())
          newGrid[row][col] = VISITED

          return {
            grid: newGrid
          }
        }), 50)
      }

      const dR = [-1, 0, 1, 0]
      const dC = [0, 1, 0, -1]

      for(let i = 0; i < 4; i++) {
        stack.push([row + dR[i], col + dC[i]])
      }
    }
  }

  export const bfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let queue = []
    queue.push([startRow, startCol])

    while(queue.length !== 0) {
      const loc = queue.shift()
      const row = loc[0]
      const col = loc[1]

      if(row < 0 || col < 0 || row >= app.state.numRows || col >= app.state.numCols) continue

      if(visited[row][col]) continue

      if(app.state.grid[row][col] === WALL) continue

      visited[row][col] = true;

      if(row === endRow && col === endCol) return

      if(row !== startRow || col !== startCol) {
        // set node to visited
        setTimeout(() => app.setState((prevState) => {
          const newGrid = prevState.grid.map((row) => row.slice())
          newGrid[row][col] = VISITED

          return {
            grid: newGrid
          }
        }), 50)
      }

      const dR = [-1, 0, 1, 0]
      const dC = [0, 1, 0, -1]

      for(let i = 0; i < 4; i++) {
        queue.push([row + dR[i], col + dC[i]])
      }
    }
  }