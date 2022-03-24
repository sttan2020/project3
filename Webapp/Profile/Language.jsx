/* Language section */
import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showAddSection: false,
        }

        this.toggleAddSection = this.toggleAddSection.bind(this);
        this.saveNewLanguage = this.saveNewLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this);

    }

    toggleAddSection() {
        this.setState(prevState => ({
            showAddSection: !prevState.showAddSection
        }));
    }


    saveNewLanguage(newLanguage) {
        var data = Object.assign({ languages: [] })
        var record = Object.assign({}, newLanguage)
        if (record.name == "" || record.level == "") {
            TalentUtil.notification.show("Please enter Language and Level", "error", null, null)
        }
        else {
            data.languages.push(...this.props.languageData, newLanguage)
            //console.log(data)
            this.props.updateProfileData(data)
            this.toggleAddSection();
        }
    }

    updateLanguage(data) {
        if (data.name == "" || data.level == "") {
            TalentUtil.notification.show("Please enter Language and Level", "error", null, null)
        }
        else {
            var languageData = this.props.languageData;
            const index = languageData.findIndex(language => language.id === data.id);
            languageData[index] = data
            this.props.updateProfileData({
                languages: languageData
            });
        }
    }

    deleteLanguage(data) {
        this.props.updateProfileData({
            languages: this.props.languageData.filter(language => {
                return (language.id !== data.id);
            })
        });
    }

    render() {

        var languageList = undefined;

        if (this.props.languageData) {
            languageList = this.props.languageData.map(language =>
                <LanguageTable
                    key={language.id}
                    language={language}
                    update={this.updateLanguage}
                    delete={this.deleteLanguage}
                />
            );
        }

        return (
            <Fragment>
                {this.state.showAddSection ? <LanguageWorkbench
                    newEntry={true}
                    toggleAddSection={this.toggleAddSection}
                    add={this.saveNewLanguage} />
                    : undefined
                }
                <div className='row'>
                    <div className="column">
                        <table className="ui fixed table">
                            <thead>
                                <tr className="row">
                                    <th className="column">Language</th>
                                    <th className="column">Level</th>
                                    <th className="right aligned column"><button type="button" className="ui teal button" disabled={this.props.status} onClick={this.toggleAddSection}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {languageList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )


    } //render
} //class

class LanguageTable extends Component {
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
        const { language } = this.props;
        return (
            <Fragment>
                {this.state.showDisplay ?
                    <tr className="row" key={language.id}>
                        <td className="column">{language.name}</td>
                        <td className="column">{language.level}</td>
                        <td className="right aligned column">
                            <i className="pencil icon"  onClick={this.toggleShowDisplay}></i>
                            <i className="cancel icon"  onClick={() => this.props.delete(language)}></i>
                        </td>
                    </tr>
                    :
                    <tr className="row" key={language.id}>
                        <td colSpan="3">
                            <div className="ui grid">
                                <LanguageWorkbench
                                    newEntry={false}
                                    language={language}
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

class LanguageWorkbench extends Component {
    constructor(props) {
        super(props);

        const detail = props.language ?
            Object.assign({}, props.language)
            : {
                id: "",
                name: "",
                level: ""
            }

        this.state = {
            language: detail
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.language)
        data[event.target.name] = event.target.value
        //console.log(data)
        this.setState({
            language: data
        })
    }

    render() {

        var buttonSwitch = undefined;
        if (this.props.newEntry) {
            var buttonSwitch =
                <Fragment>
                    <button type="button" className="ui teal button" onClick={() => this.props.add(this.state.language)}>Add</button>
                    <button type="button" className="ui button" onClick={this.props.toggleAddSection}>Cancel</button>
                </Fragment>
        } else {
            var buttonSwitch =
                <Fragment>
                    <button type="button" className="ui blue basic button" onClick={() => this.props.update(this.state.language)}>Update</button>
                    <button type="button" className="ui red basic button" onClick={this.props.toggleShowDisplay}>Cancel</button>
                </Fragment>
        }

        return (
            <div className="ui row">
                <div className="ui five wide column">
                    <SingleInput
                        inputType="text"
                        name="name"
                        content={this.state.language.name}
                        controlFunc={this.handleChange}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid language"
                        isError={false}
                    />
                </div>
                <div className='ui five wide column'>
                    <select
                        className="ui  dropdown"
                        value={this.state.language.level}
                        onChange={this.handleChange}
                        name="level">

                        <option value="">Language Level</option>
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </div>
                {buttonSwitch}
            </div>
        );
    }
}