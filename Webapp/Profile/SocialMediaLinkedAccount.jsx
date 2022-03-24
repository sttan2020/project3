/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            };

        this.state = {
            showEditSection: false,
            newAccounts: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveNewAccounts = this.saveNewAccounts.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newAccounts: data
        })
    }

    saveNewAccounts() {
        console.log(this.state.newAccounts)
        const Accounts = Object.assign({}, this.state.newAccounts)
        var updateData = {
            linkedAccounts: Accounts
        }
        this.props.saveProfileData(updateData)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        );
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid url"
                />

                <button type="button" className="ui teal button" onClick={this.saveNewAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <a href={linkedIn} className="ui linkedin button ">
                            <i className="linkedin icon"></i>
                            LinkedIn
                        </a>
                        <a href={github} className="ui black button ">
                            <i className="github icon"></i>
                            GitHub
                        </a>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" disabled={this.props.status} onClick={this.openEdit}>Edit</button>
                </div>
            </div >
        )
    }
}