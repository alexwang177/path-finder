import React from 'react'

class Node extends React.Component {

    constructor() {
        super()
        this.state = {
            isHover: false
        }
    }

    handleMouseEnter = () => {
        this.setState({
            isHover: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            isHover: false
        })
    }

    checkHover = () => {
        let className = "node-div"
        if(this.state.isHover) {
            className += " " + this.props.marker + "-hover"
        }
        return className
    }

    render() {

        const className = this.checkHover()

        return(
            <div className={className} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}></div>
        )
    }
}

export default Node