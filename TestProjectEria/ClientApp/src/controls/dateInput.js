import React from 'react';
import '../css/style.css';

export function DateInput(props) {
    return (
        <div class="form-horizontal">
            <label for="kind">{props.labelText}</label>
            <input type="date" name={props.name} value={props.value} onChange={props.handleChange} id="date" />
        </div>
    );
}

export default DateInput;