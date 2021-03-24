import React, { useState } from 'react';

export function Table(props) {

    let slicedArray = props.tasksDone.slice(0, props.numberToShow);
    console.log(slicedArray);
    console.log(props.numberToShow);
    return (
        <div class="form-horizontal">
            <h2>{ props.labelText}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Druh</th>
                        <th>Doba</th>
                        <th>Dne</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slicedArray.map((item, index) => 
                        <tr key={index + 1}>
                            <td>{item.name}</td>
                            <td>{item.workSort}</td>
                            <td>{item.time}</td>
                            <td>{item.date}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;