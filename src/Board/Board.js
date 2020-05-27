import React from 'react'
import Node from './Node'

function Board(props) {

    const grid = props.grid
    const numRows = props.numRows
    const numCols = props.numCols

    const displayGrid = grid.map((row, rowIndex) => {

        const displayRow = row.map((item, colIndex) => {
            return (<Node 
                        key={rowIndex + " " + colIndex} 
                        location={rowIndex + " " + colIndex} 
                        marker={props.marker}
                        nodeValue={props.grid[rowIndex][colIndex]}
                        handleNodeClick={props.handleNodeClick}
                        handleMouseEnter={props.handleMouseEnter}
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

    return(
        <div className="board-container">
            <div className="board" 
                 onMouseDown={props.handleMouseDown} 
                 onMouseUp={props.handleMouseUp}
            >   
                {displayGrid}
            </div>
        </div>
    )
}

export default Board
