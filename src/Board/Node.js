import React from 'react'
import { START, END, WALL, VISITED, EMPTY} from '../Constants/constants'

class Node extends React.Component {

    constructor() {
        super()
        this.state = {
            isHover: false
        }
    }

    handleMouseEnter = () => {
        this.setState({
            isHover: 
            true
        })

        const location = this.props.location.split(" ")

        //console.log(location)
        //console.log(this.props.nodeValue)
    
        this.props.handleMouseEnter(location[0], location[1])
    }

    handleMouseLeave = () => {
        this.setState({
            isHover: false
        })
    }

    handleClick = () => {
        const location = this.props.location.split(" ")

        console.log(location)
        //console.log(this.props.nodeValue)
    
        this.props.handleNodeClick(location[0], location[1])
    }

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

        if(this.state.isHover) {
            className += " " + this.props.marker + "-hover"
        }

        return className
    }

    render() {

        const className = this.nodeDisplay()

        return(
            <div
                className={className} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
            >    
            </div>
        )
    }
}

export default Node