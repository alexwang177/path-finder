import React from 'react'
import Node from './Node'

function Board(props) {

    const grid = props.grid
    const numRows = props.numRows
    const numCols = props.numCols

    console.log(grid);

    const displayGrid = grid.map((row, rowIndex) => {

        const displayRow = row.map((item, colIndex) => {
            return (<Node key={(rowIndex * numCols) + colIndex + 1}/>)
        })
        
        return (
            displayRow
        )
    })

    return(
        <div className="board">{displayGrid}
        </div>
    )
}

export default Board