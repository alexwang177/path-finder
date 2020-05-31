import { START, END, WALL, VISITED, EMPTY, PATH, SLOW, MODERATE, FAST } from '../Constants/constants'

export const generateMaze = async (app) => {
    // Change grid width and height to be odd values
    await mazeDimensions(app)

    // Timing of maze generation
    let totalDelay = [0]
    let delayOffset = 30

    // Clear board


    // Generate border of maze
    mazeBorder(app, totalDelay, delayOffset)
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

const mazeDimensions = async (app) => {
    console.log("maze dimensions")

    const orgWidth = app.state.numCols
    const orgHeight = app.state.numRows

    const newWidth = orgWidth % 2 == 0 ? Number(orgWidth) + 1 : orgWidth
    const newHeight = orgHeight % 2 == 0 ? Number(orgHeight) + 1 : orgHeight

    console.log(orgWidth + " " + orgHeight)

    if(newWidth === orgWidth && newHeight === orgHeight) return

    await app.setState(
        {
          numRows: newHeight,
          numCols: newWidth,
          grid: app.createGrid(newHeight, newWidth),
          rowInput: "",
          colInput: ""
        }
    )
}