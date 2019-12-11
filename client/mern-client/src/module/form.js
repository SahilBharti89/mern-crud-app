import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class EditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campName: '',
            campEmail: '',
            campPhone: '',
            campAddress: '',
            selectRole: 0
        }
    }
    
    render() {
        console.log("hey")
        return (
            <div>
                <div className="form-row justify-content-center">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Name </label>
                        <input type="text" className="form-control" placeholder="Name" 
                        value={this.state.campName} onChange={(value) => this.setState({campName: value.target.value})}></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" placeholder="Email" 
                        value={this.state.campEmail} onChange={(value) => this.setState({campEmail: value.target.value})}></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputState">Role</label>
                        <select id="inputState" className="form-control" 
                        onChange={(value) => this.setState({selectRole: value.target.value})}>
                            <option defaultValue>Choose...</option>
                            <option value="1">Admin</option>
                            <option value="2">Project Manager</option>
                            <option value="3">Programmer</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Phone</label>
                        <input type="number" className="form-control" placeholder="Phone" value={this.state.campPhone} 
                        onChange={(value) => this.setState({campPhone: value.target.value})}></input>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main Street" 
                    value={this.state.campAddress} onChange={(value) => this.setState({campAddress: value.target.value})}></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => this.sendSave()}>Save</button>
            </div>
        );
    }

    sendSave() {
        /// in case you haven't selected any role
        if(this.state.selectRole === 0) {
            alert('Select the type of Role');
        } else if(this.state.campPhone === '') {
            alert ("Enter phone field");
        } else if(this.state.campName === '') {
            alert ("Enter the Name field");
        } else if(this.state.campEmail === '') {
            alert ("Enter the Email field");
        } else if(this.state.campAddress === '') {
            alert ("Enter the Address field");
        } else {
           // backend url
           const baseUrl = "http://localhost:5000/employee/create";

           // parameter htmlFor post data
           const dataPost = {
               name: this.state.campName,
               email: this.state.campEmail,
               phone: this.state.campPhone,
               address: this.state.campAddress,
               role: this.state.selectRole
           }

           axios.post(baseUrl, dataPost)
           .then(response => {
               if(response.data.success === true) {
                alert(response.data.message);
               } else {
                alert(response.data.message);
               }
           }).catch(err => {
               alert("Error 34"+err);
           });
        }
    }
}

export default EditComponent;