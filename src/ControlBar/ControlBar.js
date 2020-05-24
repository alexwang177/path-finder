import React from 'react'

function ControlBar() {
    return(
        <header className="control-bar">

            <div>
                <h1>PathFinding</h1>
                <h1>Visualizer</h1>
            </div>

            <div className="control-bar-selectors">
                <select> 
                    <option>Depth-First Search</option>
                    <option>Breadth-First Search</option>
                </select>
            </div>

            <div className="control-bar-selectors">
                <label>
                    # Rows <input type="text" />
                </label>
            </div>

            <div className="control-bar-selectors">
                <label>
                    # Columns <input type="text" />
                </label>
            </div>

            <div className="control-bar-selectors">
                <select> 
                    <option>Start</option>
                    <option>End</option>
                    <option>Wall</option>
                </select>
            </div>

            <button>Visualize!</button>
        </header>
    )
}

export default ControlBar