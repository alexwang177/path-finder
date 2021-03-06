import { START, END, WALL, VISITED, EMPTY, PATH, SLOW, MODERATE, FAST, HORIZONTAL, VERTICAL, SOUTH, EAST} from '../Constants/constants'
import { updateNode } from '../EventHandlers/Node/nodeHandlers'

export const generateMaze = (app) => {
    // Change grid width and height to be odd values
    //mazeDimensions(app)

    // Timing of maze generation
    let totalDelay = [0]
    let delayOffset = 20

    mazeDimensions(app, totalDelay, delayOffset)

    // Generate border of maze
    //mazeBorder(app, totalDelay, delayOffset, () => divide(0, 0, app.state.numCols-1, app.state.numRows-1, VERTICAL, totalDelay, delayOffset, app))

    // Generate rest of maze
    // divide(0, 0, app.state.numCols, app.state.numRows, HORIZONTAL, totalDelay, delayOffset, app)

    //app.setState({ mazeIsGenerating: false })
}

const divide = async (x, y, width, height, orientation, totalDelay, delayOffset, app) => {
    if(width <= 2 || height <= 2) return

    const horizontal = orientation === HORIZONTAL

    let wx = x
    let wy = y

    if(horizontal) {
        //while(wy % 2 !== 0) 
        wy = y + getRandomInt(0, height - 1)

        while(wy % 2 !== 0)
            wy = y + getRandomInt(0, height - 1)
    }
    else{
        //while(wx % 2 !== 0) 
        wx = x + getRandomInt(0, width - 1)

        while(wx % 2 !== 0)
            wx = x + getRandomInt(0, width - 1)
    }

    let px = wx
    let py = wy

    if(horizontal) {
        while(px % 2 !== 1) 
            px = wx + getRandomInt(1, width - 1)
    }
    else{
        while(py % 2 !== 1) 
            py = wy + getRandomInt(1, height - 1) 
    }

    const dx = horizontal ? 1 : 0
    const dy = horizontal ? 0 : 1

    const length = horizontal ? width : height

    const dir = horizontal ? SOUTH : EAST

    //console.log("wx: " + wx)
    //console.log("wy: " + wy)
    //onsole.log("px: " + px)
    //console.log("py: " + py)
    //console.log("divide time begin: " + totalDelay[0])

    for(let i = 0; i < length; i++) {
        if(wx !== px || wy !== py) {
            // grid[wy][wx] = WALL
            //console.log(wy + " " + wx + " = WALL" + " time: " + totalDelay[0])

            setTimeout(function(wy, wx, app) {
                return updateState(wy, wx, app)
            }, totalDelay[0], wy, wx, app)

            /*setTimeout(() => app.setState((prevState) => {
                const newGrid = prevState.grid.map((row) => row.slice())

                    newGrid[wy][wx] = WALL
      
                return {
                  grid: newGrid
                }
              }), 0)*/
              
            totalDelay[0] += delayOffset
        
        }
        wx += dx
        wy += dy
    }

    let nx = x
    let ny = y

    let w = horizontal ? width : wx - x + 1
    let h = horizontal ? wy - y + 1 : height

    await divide(nx, ny, w, h, chooseOrientation(w, h, app), totalDelay, delayOffset, app)

    nx = horizontal ? x : wx + 1
    ny = horizontal ? wy + 1 : y
    w = horizontal ? width : x + width - wx - 1
    h = horizontal ? y + height - wy - 1 : height
    await divide(nx, ny, w, h, chooseOrientation(w, h, app), totalDelay, delayOffset, app)
}

const updateState = (wy, wx, app) => {
    //console.log(app)

    app.setState((prevState) => {

        //console.log(prevState.grid)
        //console.log(wy + " " + wx)
        const newGrid = prevState.grid.map((row) => row.slice())

        if(prevState.grid[wy][wx] !== START && prevState.grid[wy][wx] !== END)
            newGrid[wy][wx] = WALL

        return {
          grid: newGrid
        }
      })

    //console.log("hi")
}

const chooseOrientation = (w, h, app) => {
    if(app.state.maze === "rmd") {
        if(w < h) {
            return HORIZONTAL;
        } else if (h < w) {
            return VERTICAL;
        } else {
            //return rand.nextInt(2) + 1;
            return getRandomInt(0, 2) + 1
        }
    }
    else if(app.state.maze === "rmd-hs") {
        const num = getRandomInt(0, 10)

        if(num <= 1) return VERTICAL
    
        return HORIZONTAL
    }
    else if(app.state.maze === 'rmd-vs') {
        const num = getRandomInt(0, 10)

        if(num <= 1) return HORIZONTAL
    
        return VERTICAL
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

const mazeBorder = (app, totalDelay, delayOffset) => {
    //console.log("maze border")

    // Top Row and Bottom Row

    for(let j = 0; j < app.state.numCols; j++) {
        setTimeout(() => {
            app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())

            if(prevState.grid[0][j] !== START && prevState.grid[0][j] !== END)
                newGrid[0][j] = WALL
            if(prevState.grid[app.state.numRows - 1][j] !== START && prevState.grid[app.state.numRows - 1][j] !== END)
                newGrid[app.state.numRows - 1][j] = WALL
  
            return {
              grid: newGrid
            }
          })

          //console.log("setting border")
        }, totalDelay[0])

          totalDelay[0] += delayOffset
  
          //console.log("border: " + totalDelay[0])

    }

    // Left Col and Right Col

    for(let i = 0; i < app.state.numRows; i++) {
        setTimeout(() => {app.setState((prevState) => {
            const newGrid = prevState.grid.map((row) => row.slice())

            if(prevState.grid[i][0] !== START && prevState.grid[i][0] !== END)
                newGrid[i][0] = WALL
            if(prevState.grid[i][app.state.numCols - 1] !== START && prevState.grid[i][app.state.numCols - 1] !== END)    
                newGrid[i][app.state.numCols - 1] = WALL
  
            return {
              grid: newGrid
            }
          })
          
          //console.log("setting border")
        }, totalDelay[0])

          totalDelay[0] += delayOffset

          //console.log("border: " + totalDelay[0])
    }

    totalDelay[0] += delayOffset

    //console.log("callback time: " + totalDelay[0])
    //setTimeout(() => callback(), totalDelay[0])

    //callback()
}

const mazeDimensions = (app, totalDelay, delayOffset) => {
    //console.log("maze dimensions")

    const orgWidth = app.state.numCols
    const orgHeight = app.state.numRows

    const newWidth = orgWidth % 2 == 0 ? Number(orgWidth) + 1 : orgWidth
    const newHeight = orgHeight % 2 == 0 ? Number(orgHeight) + 1 : orgHeight

    const orientation = app.state.maze === "rmd-hs" ? HORIZONTAL : VERTICAL

    app.setState(
        {
          numRows: newHeight,
          numCols: newWidth,
          grid: app.createGrid(newHeight, newWidth),
          rowInput: "",
          colInput: "",
          mazeIsGenerating: true
        }, 
        () => {
            //mazeBorder(app, totalDelay, delayOffset, () => divide(0, 0, app.state.numCols-1, app.state.numRows-1, VERTICAL, totalDelay, delayOffset, app))
            mazeBorder(app, totalDelay, delayOffset)
            divide(0, 0, app.state.numCols-1, app.state.numRows-1, orientation, totalDelay, delayOffset, app)
        }
    )
}