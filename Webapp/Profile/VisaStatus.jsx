import React, { Component, Fragment } from 'react';
import { SingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';

export default class VisaStatus extends React.Component {
   constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this);
		this.saveData = this.saveData.bind(this);
	}

handleChange(event) {
		const { name, value } = event.target
		const data = { [name] : value }
       // console.log(data)

		if (name == 'visaStatus') {
			if (value == "Citizen" || value == "Permanent Resident") {
				data.visaExpiryDate = ""; 
				this.props.saveProfileData(data);
			}
			else {
				data.visaExpiryDate = moment();
				this.props.updateProfileData(data);
			}
		}
		else {
			this.props.updateProfileData(data);
		}

}//function

	saveData() { 
        this.props.saveProfileData();
	}

	render() {
		const { visaStatus } = this.props;
      
        let visaExpiryDate = undefined;
        if (visaStatus == "Work Visa" || visaStatus == "Student Visa") {
            visaExpiryDate = <Fragment>
				<div className="ui five wide column">
					<div className="field">
						<label>Visa expiry date</label>
						<SingleInput
							inputType="date"
							errorMessage="Please enter a valid date"
							name="visaExpiryDate"
							controlFunc={this.handleChange}
							content={moment(this.props.visaExpiryDate).format("YYYY-MM-DD")}
							placeholder="Visa expiry date"
							isError={false}
						/>
					</div>
				</div>
				<div className="ui five wide column"> 
					<div className="ui grid">
						<div className='ui row'>
						</div>
						<div className='ui row'>
                            <button type="button" className="ui teal button" disabled={this.props.status} onClick={this.saveData}>Save</button>
						</div>
					</div>
				</div>
			</Fragment>
        }
		
		return (
			<div className='ui sixteen wide column'>
				<div className="ui grid">
					<div className='ui row'>
						<div className="ui five wide column">
							<div className="field">
								<label>Visa type</label>
								<select
									className="ui dropdown"
									name="visaStatus"
									placeholder="Visa status"
									onChange={this.handleChange}
									value={visaStatus ? visaStatus : '' }>

									<option value=""> Select Visa </option>
									<option value="Citizen">Citizen</option>
                                    <option value="Permanent Resident">Permanent Resident</option>
                                    <option value="Work Visa">Work Visa</option>
                                    <option value="Student Visa">Student Visa</option>
								</select>
							</div>
						</div>
						{visaExpiryDate}
					</div>
				</div>
			</div>
		);

	} //render

}//class