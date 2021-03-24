import React, { useEffect } from 'react';
import { useState } from 'react';

//export const time = '';

export function TimeSelect(props) {
    const [t1, sett1] = useState('');
    const [t2, sett2] = useState('');
    const [inter, setinter] = useState('');

    console.log(inter);
    let interval = '';
    let hour = parseInt(t2.substring(0, 2)) - parseInt(t1.substring(0, 2));
    let min = parseInt(t2.substring(3, 5)) - parseInt(t1.substring(3, 5));

    if (hour >= 0) {
        
        if (min < 0)
        {
            hour -= hour;
            min = 60 + min;
        }
        if (min >= 60) {
            hour++;
            min -= 60;
        }
        min = Math.abs(min).toString();
        interval += hour.toString();
    }
    else if(hour < 0)
    {
        hour = Math.abs(hour);
        interval += (24 - hour).toString();
        min = 60 + min;
        while (min >= 60) {
            hour++;
            min -= 60;
        }
    }
    if (interval.length == 1) { interval = '0' + interval; }
    interval += ':';
    min = min.toString();
    if (min.length == 1) { min = '0' + min; }
    interval = interval + min;
    return (
        <div class="form-horizontal">
            <label for="timeTotal">Čas</label>
            <span>Od</span><input type="time" value={t1} onChange={e => sett1(e.target.value)} name="time1" id="time1" />
            <span>Do</span><input type="time" value={t2} onChange={e => sett2(e.target.value)} name="time2" id="time2" />
            <span>Odpracováno</span><input type="time" value={interval} name="time" onMouseOver={props.handleChange}/>
        </div>
    );
}

export default TimeSelect;