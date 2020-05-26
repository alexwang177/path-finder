import React from 'react'
import Node from './Node'

function Board(props) {

    const grid = props.grid
    const numRows = props.numRows
    const numCols = props.numCols

    //console.log(grid);

    const displayGrid = grid.map((row, rowIndex) => {

        const displayRow = row.map((item, colIndex) => {
            return (<Node key={(rowIndex * numCols) + colIndex + 1} marker={props.marker}/>)
        })

        return (
            <div key={rowIndex} className="grid-row">{displayRow}</div>
        )
    })

    return(
        <div className="board-container">
            <div className="board">{displayGrid}</div>
        </div>
    )
}

export default Board