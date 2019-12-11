import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import { Link } from 'react-router-dom';

// library sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// RestApi Backend url
const baseUrl = "http://localhost:5000";

class listComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listEmployee: []
        }
    }
    componentDidMount() {
        this.loadEmployee();
    }

    loadEmployee() {
        const url = baseUrl+"/employee/list";
        axios.get(url)
        .then(res => {
            if(res.data.success) {
                const data = res.data.data;
                this.setState({ listEmployee: data });
            } else {
                alert('Error web Service');
            }
        }).catch(error => {
            alert("Error server: "+error);
        });
    }

    render() {
        return (
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Admin</td>
                        <td>John Smith</td>
                        <td>john@smith.com</td>
                        <td>California</td>
                        <td>45678945612</td>
                        <td>
                            <button className="btn btn-outline-info ">Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-outline-danger ">Delete</button>
                        </td>
                    </tr>
                    {this.loadFillData()}
                </tbody>
            </table>
        );
    }

    loadFillData() {
        return this.state.listEmployee.map((data) => {
            return (
                <tr>
                    <th>{data.id}</th>
                    <td>{data.role.role}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.phone}</td>
                    <td>
                        <Link className="btn btn-outline-info " to={"/edit/"+data.id}>Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger " onClick={() => this.onDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if(result.value) {
                this.sendDelete(id);
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                console.log("dsh ")
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    sendDelete(userId) {
        // backend url
        const url = baseUrl+"/employee/delete";
        axios.post(url, { id: userId })
        .then(response => {
            if(response.data.success) {
                Swal.fire(
                    'Deleted!',
                    'Your employee has been deleted.',
                    'success'
                );
                this.loadEmployee();
            }
        }).catch(err => {
            alert('Error 325 '+err);
        })
    }
}

export default listComponent;


