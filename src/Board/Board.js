import React from 'react'
import Node from './Node'

/*class Board extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        //console.log("board render")

        const grid = this.props.grid
        const numRows = this.props.numRows
        const numCols = this.props.numCols
    
        //console.log(grid);
    
        const displayGrid = grid.map((row, rowIndex) => {
    
            const displayRow = row.map((item, colIndex) => {
                return (<Node 
                            key={rowIndex + " " + colIndex} 
                            location={rowIndex + " " + colIndex} 
                            marker={this.props.marker}
                            nodeValue={this.props.grid[rowIndex][colIndex]}
                            handleNodeClick={this.props.handleNodeClick}
                            handleMouseEnter={this.props.handleMouseEnter}
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
                <div className="board" 
                     onMouseDown={this.props.handleMouseDown} 
                     onMouseUp={this.props.handleMouseUp}
                >   
                    {displayGrid}
                </div>
            </div>
        )
    }
}

export default Board*/

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

    //console.log("board render");

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
