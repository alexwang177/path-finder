import React from 'react'
import { START, END, WALL, VISITED, EMPTY} from '../Constants/constants'

import { handleClick, handleMouseEnter, handleMouseLeave } from '../EventHandlers/Node/nodeHandlers'
import { exportDefaultSpecifier } from '@babel/types'

class Node extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.nodeValue != this.props.nodeValue) {
            return true
        }

        return false
    }

    handleMouseEnter = (e) => handleMouseEnter(e, this.props)

    handleMouseLeave = (e) => handleMouseLeave(e, this.props)

    handleClick = () => handleClick(this.props)
    
    nodeDisplay = () => {
        let className = "node-div"

        if(this.props.nodeValue === START){
            className += " start-node"
        }
        else if(this.props.nodeValue === END){
            className += " end-node"
        }
        else if(this.props.nodeValue === WALL){
            className += " wall-node"
        }
        else if(this.props.nodeValue === VISITED){
            className += " visited-node"
        }

        return className
    }

    render() {

        const location = this.props.location.split(" ")
        console.log("node render " + location[0] + " " + location[1])
        console.log(this.props.nodeValue)

        const className = this.nodeDisplay()

        return(
            <div
                className={className} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >    
            </div>
        )
    }
}

export default Node