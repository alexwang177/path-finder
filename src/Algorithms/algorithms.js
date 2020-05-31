import { START, END, WALL, VISITED, EMPTY, PATH, SLOW, MODERATE, FAST } from '../Constants/constants'

export const dfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let stack = []
    stack.push([startRow, startCol])

    let parentMap = new Map()

    let found = false

    let totalDelay = 0
    const delayOffset = getSpeed(app.state.speed)

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
        }), totalDelay)

        totalDelay += delayOffset
      }

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
    getPath(parentMap, endRow, endCol, totalDelay, delayOffset, app)

  }

  export const bfs = (startRow, startCol, endRow, endCol, visited, app) => {
    let queue = []
    queue.push([startRow, startCol])

    let parentMap = new Map()
    let found = false

    let totalDelay = 0
    const delayOffset = getSpeed(app.state.speed)

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
        }), totalDelay)

        totalDelay += delayOffset
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

    getPath(parentMap, endRow, endCol, totalDelay, delayOffset, app)
  }

  export const bidirectional = (startRow, startCol, endRow, endCol, visited, app) => {
    console.log("bds")
    let queueA = []
    let queueB = []

    let visitedA = {}
    let visitedB = {}

    visitedA[startRow + " " + startCol] = "#"
    visitedB[endRow + " " + endCol] = "#"

    queueA.push([startRow, startCol])
    queueB.push([endRow, endCol])

    console.log("start: " + startRow + " " + startCol)

    let totalDelay = [0]
    const delayOffset = getSpeed(app.state.speed)

    let found = false

    let parentMap = new Map()

    while(queueA.length !== 0 && queueB.length !== 0) {
      if(bdsHelper(queueA, visitedA, visitedB, startRow, startCol, endRow, endCol, totalDelay, delayOffset, parentMap, app)){
        found = true
        break
      }

      if(bdsHelper(queueB, visitedB, visitedA, startRow, startCol, endRow, endCol, totalDelay, delayOffset, parentMap, app)){
        found = true
        break
      }
    }

    //if(found) {
      //getPathBDS(parentMap, endRow, endCol, totalDelay[0], delayOffset, app)
    //}
  }

  const bdsHelper = (queue, visitedSelf, visitedOther, startRow, startCol, endRow, endCol, totalDelay, delayOffset, parentMap, app) => {
    if(queue.length !== 0) {
      console.log("bds helper")
      const loc = queue.shift()
      const row = loc[0]
      const col = loc[1]

      console.log(row + " " + col)

      if(row < 0 || col < 0 || row >= app.state.numRows || col >= app.state.numCols) return false

      if(app.state.grid[row][col] === WALL) return false

      // mark current node as visited
      const startMark = row === startRow && col === startCol
      const endMark = row === endRow && col === endCol

      if(!startMark && !endMark) {
        // set node to visited
        setTimeout(() => app.setState((prevState) => {
          const newGrid = prevState.grid.map((row) => row.slice())
          newGrid[row][col] = VISITED

          return {
            grid: newGrid
          }
        }), totalDelay[0])

        totalDelay[0] += delayOffset
      }

      const dR = [-1, 0, 1, 0]
      const dC = [0, 1, 0, -1]

      for(let i = 0; i < 4; i++) {
        const newR = row + dR[i]
        const newC = col + dC[i]

        if(visitedOther.hasOwnProperty(newR + " " + newC)){
          console.log("Meeting: " + newR + " " + newC)

          parentMap.set(newR + " " + newC + "alt", row + " " + col)

          setTimeout(() => app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())
            newGrid[newR][newC] = VISITED
  
            return {
              grid: newGrid
            }
          }), totalDelay[0])
  
          totalDelay[0] += delayOffset

          getPathBDS(parentMap, newR, newC, totalDelay[0], delayOffset, app)

          return true
        }
        else if(!visitedSelf.hasOwnProperty(newR + " " + newC)){

          if(newR < 0 || newC < 0 || newR >= app.state.numRows || newC >= app.state.numCols) continue

          if(app.state.grid[newR][newC] === WALL) continue

          visitedSelf[newR + " " + newC] = "#"
          queue.push([newR, newC])
          parentMap.set(newR + " " + newC, row + " " + col)
        }

      }

    }

    return false
  }

  export const getPathBDS = (parentMap, meetingRow, meetingCol, totalDelay, delayOffset, app) => {
    console.log("PATH BDS")

    let cur = meetingRow + " " + meetingCol
    let pathA = []

    let pathAContainsStart = false

    while(parentMap.has(cur)) {
      const loc = cur.split(" ")
      const row = loc[0]
      const col = loc[1]

      if(app.state.grid[row][col] !== START && app.state.grid[row][col] !== END) 
        pathA.push([row, col])

      //if(app.state.grid[row][col] === START) pathAContainsStart = true

      cur = parentMap.get(cur)
    }

    const loc = cur.split(" ")
    if(app.state.grid[loc[0]][loc[1]] === START) pathAContainsStart = true

    //pathA.reverse()

    cur = meetingRow + " " + meetingCol + "alt"
    let pathB = []
    
    while(parentMap.has(cur)) {
      const loc = cur.split(" ")
      const row = loc[0]
      const col = loc[1]

      if(app.state.grid[row][col] !== START && app.state.grid[row][col] !== END) 
        pathB.push([row, col])

      cur = parentMap.get(cur)
    }

    let finalPath = []

    if(pathAContainsStart) {
      pathA.reverse()
      finalPath = pathA.concat(pathB)
    }
    else {
      pathB.reverse()
      finalPath = pathB.concat(pathA)
    }

    // Add some time before the path renders
    totalDelay += 500

    finalPath.forEach((loc) => {
        const rowIdx = loc[0]
        const colIdx = loc[1]

        setTimeout(() => app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())

            if(prevState.grid[rowIdx][colIdx] !== START && prevState.grid[rowIdx][colIdx] !== END)
                newGrid[rowIdx][colIdx] = PATH

            return {
            grid: newGrid
            }
        }), totalDelay)

        totalDelay += delayOffset
    })
  }

  export const getPath = (parentMap, endRow, endCol, totalDelay, delayOffset, app) => {
    console.log("PATH")

    console.log(parentMap)

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

    // Add some time before the path renders
    totalDelay += 500

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
        }), totalDelay)

        totalDelay += delayOffset
    })
  }

  const getSpeed = (speed) => {
    switch(speed) {
      case "slow":
        return SLOW
        break

      case "moderate":
        return MODERATE
        break

      case "fast":
        return FAST
        break
    }
  }