import React, { Component } from 'react';
import { TextInput } from './controls/textInput';
import { TimeSelect } from './controls/timeSelect';
import { TextSelect } from './controls/textSelect';
import { DateInput } from './controls/dateInput';
import { Button } from './controls/button';
import { Table } from './controls/table';
import { NumberInput } from './controls/numberInput';
import { GetApi, PostApi, DeleteApi } from '../src/services/actions';

import './css/style.css';
import { error } from 'jquery';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskSort: '',
            time: '',
            newSortName: '',
            date: '',
            tasksToSelect: [],
            tasksDone: [],
            tasksOnPage: 10,
            sent: false,
            success: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        let tasksToSelect = [];
        /*na tomhle jsem testoval frontend, nez jsem zfunkcnil api
        tasksToSelect.push({ Id: 0, TextItem: "Hajajajaja" });
        tasksToSelect.push({ Id: 1, TextItem: "Ojajjajaja" });
        */
        let tasksDone = [];


        GetApi('Api/WorkSorts')
            .then(data => {
                this.setState({
                    tasksToSelect: data
                }); this.setState({ taskSort: data[0].textItem }); console.log(data);
            }).catch(error => { console.error(error) });

        GetApi('Api/WorkTasks')
            .then(data => {
                for (let o of data) {
                    o['date'] = o.trackedTime.split("T")[0];
                    o['time'] = o.trackedTime.split("T")[1];
                    delete o['trackedTime'];
                };

                console.log(data);
                this.setState({ tasksDone: data });
            }).catch(error => { console.error(error) });
        this.setState({ tasksToSelect });
        this.setState({ tasksDone });
    }

    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        console.log(value);
        this.setState({[name]: value});
    }

    createTaskDone = () => {
        let taskDone = {};
        taskDone['name'] = this.state.taskName;
        let taskSort = this.state.tasksToSelect;
        taskSort = taskSort.filter(
            obj => obj.textItem == this.state.taskSort
        );
        taskDone['workSort'] = this.state.taskSort;
        taskDone['trackedTime'] = this.state.date +'T'+ this.state.time;
        return taskDone;
    }

    createNewSort = () => {
        let newSort = {};
        newSort['id'] = 0;
        newSort['textItem'] = this.state.newSortName;
        return newSort;
    }

    handleSubmitAddWorkSort = (e) => {
        e.preventDefault();
        let newSort = this.createNewSort();
        PostApi('Api/WorkSorts', newSort).catch(console.error(error));
        window.location.reload();
    }

    handleSubmitAddWorkDone = (e) => {
        e.preventDefault();
        let taskDone = this.createTaskDone();
        PostApi('Api/WorkTasks', taskDone).catch(console.error(error));
        window.location.reload();
    }

    render() {
        console.log(this.state);
            return (
                <div class="main">
                    <h2>Přidat provedenou práci</h2>
                    <form action="">
                        <TextInput labelText="Název"
                            name="taskName"
                            handleChange={this.handleChange}
                            prompt="Například kódování formuláře odvozu popelnic" />
                        <TextSelect labelText="Druh"
                            name="taskSort"
                            value={this.state.taskSort}
                            toSelect={this.state.tasksToSelect}
                            handleChange={this.handleChange} />
                        <TimeSelect
                            name="time"
                            value={this.state.time}
                            handleChange={this.handleChange} />
                        <DateInput labelText="Dne"
                            name="date"
                            value={this.state.date}
                            handleChange={this.handleChange} />
                        <Button labelText="Uložit" onClick={this.handleSubmitAddWorkDone} />
                    </form>
                    <hr />
                    <Table
                        labelText="Uskutečněná práce"
                        numberToShow={this.state.tasksOnPage}
                        tasksDone={this.state.tasksDone} />
                    <hr/>

                    <h2>Přidat druh práce</h2>
                    <form action="">
                        <TextInput
                            labelText="Druh"
                            name="newSortName"
                            handleChange={this.handleChange}
                            prompt="Například práce - frontend" />
                        <Button labelText="Uložit" onClick={this.handleSubmitAddWorkSort} />
                    </form>
                    <NumberInput labelText="Záznamů na stránce:" name="tasksOnPage" value={this.state.tasksOnPage} handleChange={this.handleChange} />
                </div>
        );
    }
}
