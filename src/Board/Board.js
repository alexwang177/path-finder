import React from 'react'
import Node from './Node'

function Board(props) {

    const grid = props.grid
    const numRows = props.numRows
    const numCols = props.numCols

    //console.log(grid);

    const displayGrid = grid.map((row, rowIndex) => {

        const displayRow = row.map((item, colIndex) => {
            return (<Node 
                        key={rowIndex + " " + colIndex} 
                        location={rowIndex + " " + colIndex} 
                        marker={props.marker}
                        nodeValue={props.grid[rowIndex][colIndex]}
                        handleNodeClick={props.handleNodeClick}
                        />)
        })

        return (
            <div 
                key={rowIndex} 
                className="grid-row"
            >
                {displayRow}
            </div>
        )
    })

    //console.log("board render");

    return(
        <div className="board-container">
            <div className="board">{displayGrid}</div>
        </div>
    )
}

export default Board