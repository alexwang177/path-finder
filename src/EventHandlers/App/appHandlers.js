import { START, END, WALL, VISITED, EMPTY } from '../../Constants/constants'

export const handleMouseDown = (app) => {
    app.setState({ mouseIsDown: true })
}

export const handleMouseUp = (app) => {
    app.setState({ mouseIsDown: false })
}

export const handleMouseEnter = (rowIndex, colIndex, app) => {
    if(!app.state.mouseIsDown) return

    app.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())

      if(prevState.marker === "wall") {

        newGrid[rowIndex][colIndex] === WALL ? 
          newGrid[rowIndex][colIndex] = EMPTY :
          newGrid[rowIndex][colIndex] = WALL
      }

      return {
        grid: newGrid
      }
    })
}

export const handleNodeClick = (rowIndex, colIndex, app) => {
    app.setState((prevState) => {
      const newGrid = prevState.grid.map((row) => row.slice())

      if(prevState.marker === "start") {
        for(let i = 0; i < newGrid.length; i++){
          for(let j = 0; j < newGrid[0].length; j++){
            if(newGrid[i][j] === START)
              newGrid[i][j] = EMPTY
          }
        }

        newGrid[rowIndex][colIndex] = START
      }
      else if(prevState.marker === "end") {
        for(let i = 0; i < newGrid.length; i++){
          for(let j = 0; j < newGrid[0].length; j++){
            if(newGrid[i][j] === END)
              newGrid[i][j] = EMPTY
          }
        }

        newGrid[rowIndex][colIndex] = END

      }
      else if(prevState.marker === "wall") {

        newGrid[rowIndex][colIndex] === WALL ? 
          newGrid[rowIndex][colIndex] = EMPTY :
          newGrid[rowIndex][colIndex] = WALL
      }

      return {
        grid: newGrid
      }
    })
}

export const handleFormButton = (e, app) => {
    const {name} = e.target

    if(name === "sizeButton") {

      if(isNaN(app.state.rowInput) || isNaN(app.state.colInput) || app.state.rowInput === "" || app.state.colInput === ""){
        alert("Please enter a valid input.")
        return
      } 

      app.setState((prevState) => {

        return {
          numRows: Number(prevState.rowInput),
          numCols: Number(prevState.colInput),
          grid: app.createGrid(prevState.rowInput, prevState.colInput),
          rowInput: "",
          colInput: ""
        }
      })
    }

    if(name === "clearButton") {
      clearGrid(app)
    }
}

const clearGrid = (app) => {
  console.log("clear grid")

  app.setState((prevState) => {

      return {
        grid: app.createGrid(prevState.numRows, prevState.numCols)
      }
    })
}


export const handleFormChange = (e, app) => {

    const {name, value} = e.target

    if(name === "rowInput" || name === "colInput" || name === "algorithm" || name === "marker" || name === "speed" || name === "maze") {
      app.setState({ [name] : value })
    }
  }
