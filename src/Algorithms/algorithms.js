import { START, END, WALL, VISITED, EMPTY, PATH } from '../Constants/constants'

export const dfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let stack = []
    stack.push([startRow, startCol])

    let parentMap = new Map()

    let found = false

    while(stack.length !== 0) {

      const loc = stack.pop()
      const row = loc[0]
      const col = loc[1]

      if(row < 0 || col < 0 || row >= app.state.numRows || col >= app.state.numCols) continue

      if(visited[row][col]) continue

      if(app.state.grid[row][col] === WALL) continue

      console.log("visiting node...")
      visited[row][col] = true;

      if(row === endRow && col === endCol) {
          found = true
          break
      }

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

          /*app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())

            if(row !== startRow || col !== startCol)
            newGrid[row][col] = VISITED

            return {
              grid: newGrid
            }
          })*/

        console.log(app.state.grid)

        const dR = [-1, 0, 1, 0]
        const dC = [0, 1, 0, -1]

        for(let i = 0; i < 4; i++) {
            const newR = row + dR[i]
            const newC = col + dC[i]

            if(newR < 0 || newC < 0 || newR >= app.state.numRows || newC >= app.state.numCols) continue

            if(!visited[newR][newC]) {
                stack.push([row + dR[i], col + dC[i]])
                parentMap.set(newR + " " + newC, row + " " + col)
            }
        }

    
    }
    getPath(parentMap, endRow, endCol, app)

  }

  export const bfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let queue = []
    queue.push([startRow, startCol])

    let parentMap = new Map()
    let found = false

    let delayOffset = 0;

    while(queue.length !== 0) {
      const loc = queue.shift()
      const row = loc[0]
      const col = loc[1]

      if(row < 0 || col < 0 || row >= app.state.numRows || col >= app.state.numCols) continue

      if(visited[row][col]) continue

      if(app.state.grid[row][col] === WALL) continue

      console.log("bfs visiting node...")
      visited[row][col] = true;

      if(row === endRow && col === endCol) {
          found = true
          break
      }

      if(row !== startRow || col !== startCol) {
        // set node to visited
        setTimeout(() => app.setState((prevState) => {
          const newGrid = prevState.grid.map((row) => row.slice())
          newGrid[row][col] = VISITED

          return {
            grid: newGrid
          }
        }), delayOffset)

        delayOffset += 75
      }

      const dR = [-1, 0, 1, 0]
      const dC = [0, 1, 0, -1]

      for(let i = 0; i < 4; i++) {
        const newR = row + dR[i]
        const newC = col + dC[i]

        if(newR < 0 || newC < 0 || newR >= app.state.numRows || newC >= app.state.numCols) continue

        if(!visited[newR][newC]){
            queue.push([newR, newC])
            parentMap.set(newR + " " + newC, row + " " + col)
        }

      }

    }
    // while loop exits

    getPath(parentMap, endRow, endCol, delayOffset, app)
  }

  export const getPath = (parentMap, endRow, endCol, delayOffset, app) => {
    let cur = endRow + " " + endCol
    let path = []

    while(parentMap.has(cur)) {
        console.log(cur)

        const loc = cur.split(" ")
        const row = loc[0]
        const col = loc[1]

        if(row !== endRow || col !== endCol) 
            path.push([row, col])

        cur = parentMap.get(cur)
    }

    path.reverse()

    let pathDelayOffset = 0

    path.forEach((loc) => {
        const rowIdx = loc[0]
        const colIdx = loc[1]

        setTimeout(() => app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())

            if(prevState.grid[rowIdx][colIdx] !== END)
                newGrid[rowIdx][colIdx] = PATH

            return {
            grid: newGrid
            }
        }), delayOffset + 500 + pathDelayOffset)

        pathDelayOffset += 75
    })
  }