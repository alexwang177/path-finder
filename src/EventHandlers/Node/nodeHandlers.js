export const handleClick = (props) => {
    const location = props.location.split(" ")

    console.log(location)
    console.log(props.nodeValue)

    props.handleNodeClick(location[0], location[1])
}

export const handleMouseEnter = (e, props) => {

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
    e.target.classList.remove(props.marker + "-hover")
}