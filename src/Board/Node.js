import React from 'react'
import { START, END, WALL, VISITED, EMPTY} from '../Constants/constants'

class Node extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        //if(nextProps.nodeValue == this.props.nodeValue) return false

        if(nextProps.nodeValue != this.props.nodeValue) {
            return true
        }

        return false
    }

    handleMouseEnter = (e) => {

        e.target.classList.add(this.props.marker + "-hover")

        const location = this.props.location.split(" ")

        //console.log(location)
        //console.log(this.props.nodeValue)
    
        this.props.handleMouseEnter(location[0], location[1])
    }

    handleMouseLeave = (e) => {
        /*this.setState({
            isHover: false
        })*/
        e.target.classList.remove(this.props.marker + "-hover")
    }

    handleClick = () => {
        const location = this.props.location.split(" ")

        console.log(location)
        console.log(this.props.nodeValue)
    
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