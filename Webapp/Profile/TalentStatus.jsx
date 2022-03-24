import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
 constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	render() {

        const Options = [
	        { key: '0', value: 'Actively looking for a job', title: 'Actively looking for a job' },
	        { key: '1', value: 'Not looking for a job at the moment' , title: 'Not looking for a job at the moment' },
	        { key: '2', value: 'Currently employed but open to offers' , title: 'Currently employed but open to offers' },
	        { key: '3', value: 'Will be available on a later date', title: 'Will be available on a later date' }
        ]

		var talentStatus = Options.map(option =>
			<Form.Field key={option.key}>
				<Checkbox
					radio
					label={option.title}
					name='status'
					value={option.value}
                    checked={this.props.status ? this.props.status.status == option.value : false}
					onChange={this.handleChange}
				/>
			</Form.Field>
		)

		return (
			<div className='ui row'>
				<div className="ui sixteen wide column">
					<Form.Field>
						<b>Current Status</b>
					</Form.Field>
					{talentStatus}
				</div>
			</div>
		);
	}//render

    handleChange(e, { value }) {
        const data = Object.assign({
            jobSeekingStatus: {
                status: ''
            }
        })
        data.jobSeekingStatus.status = value;
        //console.log(value)
        this.props.saveProfileData(data)
    }

	
}//class