import React from 'react'
import { START, END, WALL, VISITED, EMPTY, PATH } from '../Constants/constants'

import { handleClick, handleMouseEnter, handleMouseLeave } from '../EventHandlers/Node/nodeHandlers' 
import { exportDefaultSpecifier } from '@babel/types'

import Point from './Point'

class Node extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false
        }
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

        if(!this.state.loading) {
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
            else if(this.props.nodeValue === PATH){
                className += " path-node"
            }
        }

        return className
    }

    /*drop = (e) => {
        e.preventDefault()
        const pointID = e.dataTransfer.getData("pointID")

        const point = document.getElementById(pointID)
        point.style.display = "block"

        e.target.appendChild(point)
    }*/

    dragOver = (e) => {
        e.preventDefault()
    }

    render() {

        const location = this.props.location.split(" ")
        //console.log("node render " + location[0] + " " + location[1])
        //console.log(this.props.nodeValue)

        const className = this.nodeDisplay()

        return(
            <div
                id={this.props.location}
                className={className} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
                onDrop={this.props.drop}
                onDragOver={this.dragOver}
            >
                {this.props.nodeValue === START ? <Point id="start-point" dragStart={this.props.dragStart}/> : null}
                {this.props.nodeValue === END ? <Point id="end-point" dragStart={this.props.dragStart}/> : null}
            </div>
        )
    }
}

export default Node