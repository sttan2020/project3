﻿import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        

  const addressData = props.addressData ?
			Object.assign({}, props.addressData)
			: {
				number: "",
				street: "",
				suburb: "",
				postCode: "",
				city: "",
				country: ""
			}

		this.state = {
			showEditSection: false,
			newAddress: addressData
		}

		this.openEdit = this.openEdit.bind(this)
		this.closeEdit = this.closeEdit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.saveAddress = this.saveAddress.bind(this)
		this.renderEdit = this.renderEdit.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
	
	}

    componentDidMount() {

    }
    
    openEdit() {
		const addressData = Object.assign({}, this.props.addressData)
		this.setState({
			showEditSection: true,
			newAddress: addressData
		})
	}

	closeEdit() {
		this.setState({
			showEditSection: false
		})
	}

	handleChange(event) {
		const data = Object.assign({}, this.state.newAddress)
		data[event.target.name] = event.target.value
		this.setState({
			newAddress: data
		})
	}

   saveAddress() {
		//console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)
		var updatedAddress = {
            address: data
       }
       this.props.saveProfileData(updatedAddress)
       this.closeEdit()
      
   
	}

    render() {

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

 renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddress.country;
		const selectedCity = this.state.newAddress.city;
  
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}> {x} </option>);

        if (selectedCountry != "" && selectedCountry != null ) {
           
            var cities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {cities}
            </select><br/></span>
        }
    
    return(
        <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.newAddress.number}
                                controlFunc={this.handleChange}
                                maxLength={8}
                                placeholder="Enter your number"
                                errorMessage="Please enter a valid number"
                            />
                        </div>
                        <div className='eight wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newAddress.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your street"
                                errorMessage="Please enter a valid street"
                            />
                        </div>
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newAddress.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your suburb"
                                errorMessage="Please enter a valid suburb"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='six wide column field'>
                            <label>Country</label>
                            <select className="ui right labeled dropdown"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">

                                <option value="">Select a country</option>
                                {countriesOptions}
                            </select>
                        </div>
                        <div className='six wide column field'>
                            <label>City</label>
                            {citiesOptions}
                        </div>
                        <div className='four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Post Code"
                                name="postCode"
                                value={this.state.newAddress.postCode}
                                controlFunc={this.handleChange}
                                maxLength={10}
                                placeholder="Enter your post code"
                                errorMessage="Please enter a valid post code"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='column'>
                            <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
renderDisplay() {

		let address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street},
            ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
		let city = this.props.addressData ? this.props.addressData.city : ""
		let country = this.props.addressData ? this.props.addressData.country : ""

		return (
			<div className='row'>
				<div className="ui sixteen wide column">
					<React.Fragment>
						<p>Address: {address}</p>
						<p>City: {city}</p>
						<p>Country: {country}</p>
					</React.Fragment>
                    <button type="button" className="ui right floated teal button" disabled={this.props.status} onClick={this.openEdit}>Edit</button>
				</div>
			</div>
		)
	}

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
         
     	this.handleChange = this.handleChange.bind(this)

	}

	handleChange(event) {
		const data = Object.assign({}, this.props.nationalityData)
        data[event.target.name] = event.target.value
		this.props.saveProfileData(data);
	}


	render() {
		let countriesOptions = [];
		const selectedCountry = this.props.nationalityData ? this.props.nationalityData : ""

		countriesOptions = Object.keys(Countries).map((x) =>
			<option key={x} value={x}> {x} </option>
		);

		return (
			<div className='ui row'>
				<div className="ui six wide column">
					<select
						className="ui dropdown"	
						value={selectedCountry}
						onChange={this.handleChange}
						name="nationality">
                        <option value="">Select Your Nationality</option>
						{countriesOptions}
					</select>
				</div>
			</div>
		)
	}
}