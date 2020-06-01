import { START, END, WALL, VISITED, EMPTY, PATH, SLOW, MODERATE, FAST, HORIZONTAL, VERTICAL, SOUTH, EAST} from '../Constants/constants'

export const generateMaze = async (app) => {
    // Change grid width and height to be odd values
    await mazeDimensions(app)

    // Timing of maze generation
    let totalDelay = [0]
    let delayOffset = 30

    // Generate border of maze
    mazeBorder(app, totalDelay, delayOffset)

    // Generate rest of maze
    divide(1, 1, app.state.numCols - 2, app.state.numRows - 2, VERTICAL, totalDelay, delayOffset, app)
}

const divide = (x, y, width, height, orientation, totalDelay, delayOffset, app) => {
    if(width <= 2 || height <= 2) return

    const horizontal = orientation === HORIZONTAL

    let wx = x + (horizontal ? 0 : getRandomInt(0, width - 2))
    let wy = y + (horizontal ? getRandomInt(0, height - 2) : 0)

    const px = wx + (horizontal ? getRandomInt(0, width) : 0)
    const py = wy + (horizontal ? 0 : getRandomInt(0, height))

    const dx = horizontal ? 1 : 0
    const dy = horizontal ? 0 : 1

    const length = horizontal ? width : height

    const dir = horizontal ? SOUTH : EAST

    for(let i = 0; i < length; i++) {
        if(wx !== px || wy !== py) {
            // grid[wy][wx] = WALL

            setTimeout(() => app.setState((prevState) => {
                const newGrid = prevState.grid.map((row) => row.slice())
                newGrid[wy][wx] = WALL
      
                return {
                  grid: newGrid
                }
              }), totalDelay[0])
              
            totalDelay[0] += delayOffset
            
            wx += dx
            wy += dy
        }
    }

    let nx = x
    let ny = y

    let w = horizontal ? width : wx - x + 1
    let h = horizontal ? wy - y + 1 : height

    divide(nx, ny, w, h, chooseOrientation(w, h), totalDelay, delayOffset, app)

    nx = horizontal ? x : wx + 1
    ny = horizontal ? wy + 1 : y
    w = horizontal ? width : x + width - wx - 1
    h = horizontal ? y + height - wy - 1 : height
    divide(nx, ny, w, h, chooseOrientation(w, h), totalDelay, delayOffset, app)
}

const chooseOrientation = (w, h) => {
    if(w < h) {
        return HORIZONTAL;
    } else if (h < w) {
        return VERTICAL;
    } else {
        //return rand.nextInt(2) + 1;
        return getRandomInt(0, 2) + 1
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

const mazeBorder = (app, totalDelay, delayOffset) => {
    // Top Row and Bottom Row

    for(let j = 0; j < app.state.numCols; j++) {
        setTimeout(() => app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())
            newGrid[0][j] = WALL
            newGrid[app.state.numRows - 1][j] = WALL
  
            return {
              grid: newGrid
            }
          }), totalDelay[0])
  
          totalDelay[0] += delayOffset
    }

    // Left Col and Right Col

    for(let i = 0; i < app.state.numRows; i++) {
        setTimeout(() => app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())
            newGrid[i][0] = WALL
            newGrid[i][app.state.numCols - 1] = WALL
  
            return {
              grid: newGrid
            }
          }), totalDelay[0])
  
          totalDelay[0] += delayOffset
    }
}

const mazeDimensions = (app) => {
    console.log("maze dimensions")

    const orgWidth = app.state.numCols
    const orgHeight = app.state.numRows

    const newWidth = orgWidth % 2 == 0 ? Number(orgWidth) + 1 : orgWidth
    const newHeight = orgHeight % 2 == 0 ? Number(orgHeight) + 1 : orgHeight

    console.log(orgWidth + " " + orgHeight)

    //if(newWidth === orgWidth && newHeight === orgHeight) return

    app.setState(
        {
          numRows: newHeight,
          numCols: newWidth,
          grid: app.createGrid(newHeight, newWidth),
          rowInput: "",
          colInput: ""
        }
    )
}