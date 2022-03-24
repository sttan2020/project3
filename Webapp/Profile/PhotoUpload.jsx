/* Photo upload section */
import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            profilePhoto: "",
            fileUrl: "",
            renderEdit: false
        });

        this.handleImageChange = this.handleImageChange.bind(this);
        this.uploadButton = this.uploadButton.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);

    };


    render() {

        return (
            <div className="ui grid">
                <div className='ui row'>
                    <div className="ui sixteen wide column">
                        {(this.state.profilePhoto || this.props.imageId) ?
                            <Fragment>
                                <label htmlFor="profilePhoto" className="ui image">
                                    <img src={this.state.fileUrl ? this.state.fileUrl : this.props.imageId} className="ui medium circular image" />
                                </label>
                            </Fragment>
                            :
                            <Fragment>
                                <label htmlFor="profilePhoto" className="ui icon">
                                    <i className="camera retro circular huge icon"></i>
                                </label>
                            </Fragment>
                        }
                        <input
                            type="file"
                            name="file"
                            id="profilePhoto"
                            accept="image/*"
                            hidden
                            onChange={this.handleImageChange}
                        />
                    </div>
                </div>
                {this.state.renderEdit ? this.uploadButton() : null}
            </div>
        );
    }

    handleImageChange(event) {
       
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            this.setState({
                profilePhoto: event.target.files[0],
                fileUrl: URL.createObjectURL(event.target.files[0]),
                renderEdit: true
            });
        }

        //event.preventDefault();
        //let reader = new FileReader();
        //let file = event.target.files[0];
        //reader.onloadend = () => {
        //    this.setState({
        //        renderEdit: true,
        //        profilePhoto: file,
        //        fileUrl: reader.result


        //    });
        //}
        //reader.readAsDataURL(file)

    }

    uploadButton() {
        return (
            <div className='ui row'>
                <div className="ui sixteen wide column">
                    <button className="ui upload teal button" onClick={this.uploadPhoto}>
                        <i aria-hidden="true" className="upload icon"></i>
                        Upload
                    </button>
                </div>
            </div>
        );
    }


    uploadPhoto(event) {
       event.preventDefault();

        var cookies = Cookies.get('talentAuthToken');

        var formData = new FormData();
        formData.append('file', this.state.profilePhoto);
   
        const url = this.props.savePhotoUrl;

        this.setState({
            renderEdit: false
        });

        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                //'content-type': 'multipart/form-data'
            },
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile photo uploaded sucessfully", "success", null, null)
                   
                } else {
                    TalentUtil.notification.show("Profile failed to upload", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }
}