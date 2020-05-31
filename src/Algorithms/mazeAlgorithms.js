import { START, END, WALL, VISITED, EMPTY, PATH, SLOW, MODERATE, FAST } from '../Constants/constants'

export const generateMaze = (app) => {
    // Change grid width and height to be odd values
    mazeDimensions(app)


}

const mazeDimensions = (app) => {
    console.log("maze dimensions")

    const orgWidth = app.state.numCols
    const orgHeight = app.state.numRows

    const newWidth = orgWidth % 2 == 0 ? Number(orgWidth) + 1 : orgWidth
    const newHeight = orgHeight % 2 == 0 ? Number(orgHeight) + 1 : orgHeight

    console.log(orgWidth + " " + orgHeight)

    if(newWidth === orgWidth && newHeight === orgHeight) return

    app.setState((prevState) => {

        return {
          numRows: newHeight,
          numCols: newWidth,
          grid: app.createGrid(newHeight, newWidth),
          rowInput: "",
          colInput: ""
        }
      })
}