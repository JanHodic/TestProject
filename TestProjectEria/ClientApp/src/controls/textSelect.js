import React from 'react';
import '../css/style.css';

export function TextSelect(props) {
    return (
        <div class="form-horizontal">
            <label for={props.name}>{props.labelText}</label>
            <select name={props.name} id={props.name} onChange={props.handleChange}>
                {
                    props.toSelect.map((item, index) =>
                        <option key={index + 1} value={item.Id}
                            selected={props.value === item.Id}
                        >{item.textItem}</option>
                    )
                }
            </select>
        </div>
    );
}

export default TextSelect;