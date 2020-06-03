import React from 'react'

function Point(props) {

    /*const dragStart = (e) => {
        const target = e.target

        e.dataTransfer.setData("pointID", target.id)

        setTimeout(() => {
            target.style.display = "none"
        }, 0)

        setTimeout(() => {
            target.style.display = "block"
        }, 0)
    }*/

    const dragOver = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            id={props.id}
            draggable={true}
            onDragStart={props.dragStart}
            onDragOver={dragOver}
        >
        </div>
    )
}

export default Point