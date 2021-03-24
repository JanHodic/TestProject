import React from 'react';

export function Button(props) {

    return (
        <button type="submit" onClick={props.onClick}>{props.labelText}</button>
    );
}

export default Button;