import React from "react";

const Photo = props => {
    return (
        <li>
            <img src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`} alt={props.alt} ></img>
        </li>
    )
}

export default Photo;