import React from 'react'

function ControlBar(props) {
    return(
        <header className="control-bar">

            <div>
                <h1>PathFinding</h1>
                <h1>Visualizer</h1>
            </div>

            <div className="select control-bar-selectors" id="algo-selector">
                <select name="algorithm" value={props.algorithm} onChange={props.handleFormChange}> 
                    <option value="dfs">Depth-First Search</option>
                    <option value="bfs">Breadth-First Search</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="bds">Bi-Directional Search</option>
                </select>
            </div>

            <div className="select control-bar-selectors" id="maze-selector">
                <select name="maze" value={props.maze} onChange={props.handleFormChange}> 
                    <option value="rmd">Recursive Maze Division</option>
                    <option value="rmd-vs">Vertical Skew</option>
                    <option value="rmd-hs">Horizontal Skew</option>
                </select>
            </div>

            <button className="button" id="maze-button" onClick={props.generateMaze}>Generate Maze</button>

            <div className="control-bar-selectors" id="mark-selector">
                <select name="marker" value={props.marker} onChange={props.handleFormChange}> 
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="wall">Wall</option>
                </select>
            </div>

            <div className="select control-bar-selectors" id="speed-selector">
                <select name="speed" value={props.speed} onChange={props.handleFormChange}> 
                    <option value="slow">Slow</option>
                    <option selected="selected" value="moderate">Moderate</option>
                    <option value="fast">Fast</option>
                </select>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <label>
                    # Rows <input type="text" name="rowInput" value={props.rowInput} onChange={props.handleFormChange}/>
                </label>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <label>
                    # Columns <input type="text" name="colInput" value={props.colInput} onChange={props.handleFormChange}/>
                </label>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <button className="button" name="sizeButton" onClick={props.handleFormButton}>Update Grid Size</button>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <button className="button" name="clearButton" onClick={props.handleFormButton}>Clear Grid</button>
            </div>

            <button className="button" id="visualize-button" onClick={props.visualize}>Visualize!</button>
        </header>
    )
}

export default ControlBar