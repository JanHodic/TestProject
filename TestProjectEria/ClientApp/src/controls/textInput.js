import React from 'react';

export function TextInput(props) {
    return (
        <div class="form-horizontal">
            <label for="name">{props.labelText}</label>
            <input type="text"
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.prompt}/>
        </div>
    );
}

export default TextInput;