import React from 'react';

export function NumberInput(props) {

    return (
        <div class="form-horizontal">
            <label for="name">{props.labelText}</label>
            <input type="number"
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.prompt} />
        </div>
    );
}

export default NumberInput;