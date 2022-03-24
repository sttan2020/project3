/* Skill section */
import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { SingleInput } from '../Form/SingleInput.jsx';


export default class Skill extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showAddSection: false,
        }

        this.toggleAddSection = this.toggleAddSection.bind(this);
        this.saveNewSkill = this.saveNewSkill.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this);

    }

    toggleAddSection() {
        this.setState(prevState => ({
            showAddSection: !prevState.showAddSection
        }));
    }


    saveNewSkill(newSkill) {
        var data = Object.assign({ skills: [] })
        var record = Object.assign({}, newSkill)
        if (record.name == "" || record.level == "") {
            TalentUtil.notification.show("Please enter Skill and Level", "error", null, null)
        }
        else {
            data.skills.push(...this.props.skillData, newSkill)
            //console.log(data)
            this.props.updateProfileData(data)
            this.toggleAddSection()
        }
    }

    updateSkill(data) {
        if (data.name == "" || data.level == "") {
            TalentUtil.notification.show("Please enter Skill and Level", "error", null, null)
        }
        else {
            var skillData = this.props.skillData;
            const index = skillData.findIndex(skill => skill.id === data.id);
            skillData[index] = data

            this.props.updateProfileData({
                skills: skillData
            });
        }
    }

    deleteSkill(data) {
        this.props.updateProfileData({
            skills: this.props.skillData.filter(skill => {
                return (skill.id != data.id);
            })
        });
    }

    render() {

        var skillList = undefined;

        if (this.props.skillData) {
            skillList = this.props.skillData.map(skill =>
                <SkillTable
                    key={skill.id}
                    skill={skill}
                    update={this.updateSkill}
                    delete={this.deleteSkill}
                />
            );
        }

        return (
            <Fragment>
                {this.state.showAddSection ? <SkillWorkbench
                    newEntry={true}
                    toggleAddSection={this.toggleAddSection}
                    add={this.saveNewSkill} />
                    : undefined
                }
                <div className='row'>
                    <div className="column">
                        <table className="ui fixed table">
                            <thead>
                                <tr className="row">
                                    <th className="column">Skill</th>
                                    <th className="column">Level</th>
                                    <th className="right aligned column"><button type="button" disabled={this.props.status} className="ui teal button" onClick={this.toggleAddSection}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )


    } //render
} //class

class SkillTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDisplay: true
        }

        this.toggleShowDisplay = this.toggleShowDisplay.bind(this);
        this.update = this.update.bind(this);
    }

    toggleShowDisplay() {
        this.setState(prevState => ({
            showDisplay: !prevState.showDisplay
        }));
    }

    update(data) {
        this.props.update(data);
        this.toggleShowDisplay();
    }

    render() {
        const { skill } = this.props;
        return (
            <Fragment>
                {this.state.showDisplay ?
                    <tr className="row" key={skill.id}>
                        <td className="column">{skill.name}</td>
                        <td className="column">{skill.level}</td>
                        <td className="right aligned column">
                            <i className="pencil icon" onClick={this.toggleShowDisplay}></i>
                            <i className="cancel icon" onClick={() => this.props.delete(skill)}></i>
                        </td>
                    </tr>
                    :
                    <tr className="row" key={skill.id}>
                        <td colSpan="3">
                            <div className="ui grid">
                                <SkillWorkbench
                                    newEntry={false}
                                    skill={skill}
                                    toggleShowDisplay={this.toggleShowDisplay}
                                    update={this.update} />
                            </div>
                        </td>

                    </tr>
                }
            </Fragment>
        )
    } // render
}//class

class SkillWorkbench extends Component {
    constructor(props) {
        super(props);

        const detail = props.skill ?
            Object.assign({}, props.skill)
            : {
                id: "",
                name: "",
                level: ""
            }

        this.state = {
            skill: detail
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.skill)
        data[event.target.name] = event.target.value
        //console.log(data)
        this.setState({
            skill: data
        })
    }

    render() {

        var buttonSwitch = undefined;
        if (this.props.newEntry) {
            var buttonSwitch =
                <Fragment>
                    <button type="button" className="ui teal button" onClick={() => this.props.add(this.state.skill)}>Add</button>
                    <button type="button" className="ui button" onClick={this.props.toggleAddSection}>Cancel</button>
                </Fragment>
        } else {
            var buttonSwitch =
                <Fragment>
                    <button type="button" className="ui blue basic button" onClick={() => this.props.update((this.state.skill))}>Update</button>
                    <button type="button" className="ui red basic button" onClick={this.props.toggleShowDisplay}>Cancel</button>
                </Fragment>
        }

        return (
            <div className="ui row">
                <div className="ui five wide column">
                    <SingleInput
                        inputType="text"
                        name="name"
                        content={this.state.skill.name}
                        controlFunc={this.handleChange}
                        placeholder="Add Skill"
                        errorMessage="Please enter a valid skill"
                        isError={false}
                    />
                </div>
                <div className='ui five wide column'>
                    <select
                        className="ui  dropdown"
                        value={this.state.skill.level}
                        onChange={this.handleChange}
                        name="level">

                        <option value="">Skill Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
                {buttonSwitch}
            </div>
        );
    }
}