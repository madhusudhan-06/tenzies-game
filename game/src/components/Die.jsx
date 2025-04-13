import React from "react";

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#9f9fff' : '#d4eaca'
    };

    return (
        <button
            style={styles}
            onClick={() => props.toggleButton(props.id)}
            aria-label={`Die with ${props.number} and ${props.isHeld}? 'held':'not held'`}
        >{props.number}</button>
    )
}
export default Die;