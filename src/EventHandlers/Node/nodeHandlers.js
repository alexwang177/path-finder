import { WALL } from "../../Constants/constants"

export const handleClick = (props) => {
    const location = props.location.split(" ")

    console.log(location)
    console.log(props.nodeValue)

    props.handleNodeClick(location[0], location[1])
}

export const handleMouseEnter = (e, props) => {

    if(props.marker === "wall")
        e.target.classList.add(props.marker + "-hover")

    const location = props.location.split(" ")

    //console.log(location)
    //console.log(this.props.nodeValue)

    props.handleMouseEnter(location[0], location[1])
}

export const handleMouseLeave = (e, props) => {
    /*this.setState({
        isHover: false
    })*/
    if(props.marker === "wall")
        e.target.classList.remove(props.marker + "-hover")
}

export const updateNode = (row, col, value) => {
    const node = document.getElementById(row + " " + col)

    switch(value) {
        case WALL:
            node.classList.add("wall-node")
            break
        default: 
            break
    }
}