import React from 'react'

function ControlBar() {
    return(
        <header className="control-bar">

            <div>
                <h1>PathFinding</h1>
                <h1>Visualizer</h1>
            </div>

            <div className="control-bar-selectors" id="algo-selector">
                <select> 
                    <option>Depth-First Search</option>
                    <option>Breadth-First Search</option>
                </select>
            </div>

            <div className="control-bar-selectors" id="mark-selector">
                <select> 
                    <option>Start</option>
                    <option>End</option>
                    <option>Wall</option>
                </select>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <label>
                    # Rows <input type="text" />
                </label>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <label>
                    # Columns <input type="text" />
                </label>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <button>Update Grid Size</button>
            </div>

            <div className="control-bar-selectors" id="grid-selector">
                <button>Clear Grid</button>
            </div>

            <button id="visualize-button">Visualize!</button>
        </header>
    )
}

export default ControlBar