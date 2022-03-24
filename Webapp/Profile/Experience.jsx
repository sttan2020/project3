/* Experience section */
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Experience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderEdit: false,
            experience: {
                id: "",
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            },
            newEntry: true
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveNewExperience = this.saveNewExperience.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.deleteExperience = this.deleteExperience.bind(this);
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    handleEdit(data) {
        this.setState({
            experience: data,
            newEntry: false,
            renderEdit: true
        });
    }

    handleAdd() {
        const newExperience = {
            id: "",
            company: "",
            position: "",
            responsibilities: "",
            start: moment(),
            end: moment()
        }

        const newState = Object.assign({},
            this.state,
            { newEntry: true },
            {
                experience: newExperience
            },
            { renderEdit: true });

        this.setState(newState);
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.experience)
        data[event.target.name] = event.target.value
        this.setState({
            experience: data
        })
    }

    saveNewExperience() {
        var data = Object.assign({}, this.state.experience)
        if (data.company == "" || data.position == "" || data.responsibilities == "") {
            TalentUtil.notification.show("Please fill all details", "error", null, null)
        }
        else {
            this.props.updateProfileData({
                experience: [...this.props.experienceData, data]
            });
            this.toggleDisplay();
        }//else
    }

    updateExperience() {
        let data = this.state.experience;
        let experienceData = this.props.experienceData;

        if (data.company == "" || data.position == "" || data.responsibilities == "") {
            TalentUtil.notification.show("Please fill all details", "error", null, null)
        }
        else {
            const index = experienceData.findIndex(experience => experience.id === data.id);
            experienceData[index] = data
            this.props.updateProfileData({
                experience: experienceData
            });
            this.toggleDisplay();
        }

    }//function

    deleteExperience(data) {
        //const { experience } = this.state;
        this.props.updateProfileData({
            experience: this.props.experienceData.filter(work => {
                return (work.id != data.id);
            })
        });
    }

    toggleDisplay() {
        this.setState(prevState => ({
            renderEdit: !prevState.renderEdit
        }));
    }

    render() {

        let experienceList = [];
        if (this.props.experienceData) {
            experienceList = this.props.experienceData.map(experience =>
                <ExperienceTable
                    key={experience.id}
                    experience={experience}
                    edit={this.handleEdit}
                    delete={this.deleteExperience} />
            );
        }

        return (
            <Fragment>
                {this.state.renderEdit
                    ? <ExperienceWorkbench
                        newEntry={this.state.newEntry}
                        toggleDisplay={this.toggleDisplay}
                        experience={this.state.experience}
                        handleChange={this.handleChange}
                        add={this.saveNewExperience}
                        update={this.updateExperience}
                    />
                    : null
                }
                <div className="ui sixteen wide column">
                    <div className="ui grid">
                        <div className="ui row">
                            < div className='ui sixteen wide column' >
                                <table className="ui fixed table">
                                    <thead>
                                        <tr className="row">
                                            <th className="column">Company</th>
                                            <th className="column">Position</th>
                                            <th className="column">Responsibilities</th>
                                            <th className="column">Start</th>
                                            <th className="column">End</th>
                                            <th className="column">
                                                <button type="button" className="ui teal button" disabled={this.props.status} onClick={this.handleAdd}>
                                                    <i className="plus icon"></i> Add New</button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="">{experienceList}</tbody>
                                </table>
                            </div>
                        </div >
                    </div>
                </div>
            </Fragment>
        );
    }//render

}//class

class ExperienceTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, company, position, responsibilities, start, end } = this.props.experience;
        return (
            <Fragment>
                <tr className="row" key={id}>
                    <td className="column">{company}</td>
                    <td className="column">{position}</td>
                    <td className="column">{responsibilities}</td>
                    <td className="column">{moment(start).format("Do MMM, YYYY")}</td>
                    <td className="column">{moment(end).format("Do MMM, YYYY")}</td>
                    <td className="right aligned column">
                        <i className="pencil icon" onClick={() => this.props.edit(this.props.experience)}></i>
                        <i className="cancel icon" onClick={() => this.props.delete(this.props.experience)}></i>
                    </td>
                </tr>
            </Fragment>
        );
    } //render

} //class

class ExperienceWorkbench extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { company, position, start, end, responsibilities } = this.props.experience;
        return (
            <Fragment>
                <div className="ui row">
                    <div className="ui eight wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Company"
                            name="company"
                            value={company}
                            controlFunc={this.props.handleChange}
                            maxLength={80}
                            placeholder="Company"
                            errorMessage="Please enter a valid company"
                        />
                    </div>
                    <div className="ui eight wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Position"
                            name="position"
                            value={position}
                            controlFunc={this.props.handleChange}
                            maxLength={80}
                            placeholder="Position"
                            errorMessage="Please enter a valid position"
                        />
                    </div>
                </div>
                <div className="ui row">
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>Start Date</label>
                            <input
                                name='start'
                                type='date'
                                onChange={this.props.handleChange}
                                value={moment(start).format("YYYY-MM-DD")}
                                max={moment(end).format("YYYY-MM-DD")}
                            />
                        </div>
                    </div>
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>End Date</label>
                            <input
                                name='end'
                                type='date'
                                onChange={this.props.handleChange}
                                value={moment(end).format("YYYY-MM-DD")}
                                max={moment(end).format("YYYY-MM-DD")}
                            />
                        </div>
                    </div>
                </div>
                <div className="ui row">
                    <div className="ui sixteen wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Responsibilities"
                            name="responsibilities"
                            value={responsibilities}
                            controlFunc={this.props.handleChange}
                            maxLength={150}
                            placeholder="Responsibilities"
                            errorMessage="Please enter a valid responsibilities"
                        />
                    </div>
                </div>
                <div className="ui row">
                    <div className="ui sixteen wide column">
                        {this.props.newEntry ?
                            <Fragment >
                                <button type="button" className="ui teal button" onClick={this.props.add}>Add</button>
                                <button type="button" className="ui button" onClick={this.props.toggleDisplay}>Cancel</button>
                            </Fragment >
                            :
                            <Fragment >
                                <button type="button" className="ui teal button" onClick={this.props.update}>Update</button>
                                <button type="button" className="ui button" onClick={this.props.toggleDisplay}>Cancel</button>
                            </Fragment >
                        }
                    </div>
                </div>
            </Fragment >
        );
    } // render
}//class