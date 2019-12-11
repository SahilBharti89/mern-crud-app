import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

// RestApi Backend url
const baseUrl = "http://localhost:5000";

class EditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEmployee: {},
            campName: '',
            campEmail: '',
            campPhone: '',
            campAddress: '',
            stringRole: '',
            selectRole: 0
        }
    }

    componentDidMount() {
        // get parameter from edit/:id
        let userId = this.props.match.params.id; 
        const url = baseUrl+"/employee/get/"+userId;

        axios.get(url)
        .then(res => {
            if(res.data.success) {
                const data = res.data.data[0];
                this.setState({ 
                    dataEmployee: data,
                    campName: data.name,
                    campEmail: data.email,
                    campPhone: data.phone,
                    campAddress: data.address,
                    stringRole: data.role.role,
                    selectRole: data.roleID 
                });
            } else {
                alert('Error web Service');
            }
        }).catch(error => {
            alert("Error server: "+error);
        });
    }

    render() {
        return (
            <div>
                <div class="form-row justify-content-center">
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Name</label>
                        <input type="text" class="form-control" placeholder="Name" value={this.state.campName} 
                        onChange={(value) => this.setState({campName: value.target.value})}></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" placeholder="Email" value={this.state.campEmail} 
                        onChange={(value) => this.setState({campEmail: value.target.value})}></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputState">Role</label>
                        <select id="inputState" class="form-control" 
                        onChange={(value) => this.setState({selectRole: value.target.value})}>
                            <option selected value={this.state.dataEmployee.roleID}>{this.state.stringRole}</option>
                            <option value="1">Admin</option>
                            <option value="2">Project Manager</option>
                            <option value="1">Programmer</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Phone</label>
                        <input type="number" class="form-control" placeholder="Phone" value={this.state.campPhone} 
                        onChange={(value) => this.setState({campPhone: value.target.value})}></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main Street"
                    value={this.state.campAddress} onChange={(value) => this.setState({campAddress: value.target.value})}></input>
                </div>
                <button type="submit" class="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
            </div>
        );
    }

    sendUpdate() {
        // get parameter from edit/:id
        let userId = this.props.match.params.id; 
        const url = baseUrl+"/employee/update/"+userId;
        // parameter for post data
        const dataPost = {
            name: this.state.campName,
            email: this.state.campEmail,
            phone: this.state.campPhone,
            address: this.state.campAddress,
            role: this.state.selectRole
        }

        axios.post(url, dataPost)
           .then(response => {
               if(response.data.success) {
                alert(response.data.message);
               } else {
                alert("Error");
               }
           }).catch(err => {
               alert("Error 325"+err);
           });
    }
}

export default EditComponent;