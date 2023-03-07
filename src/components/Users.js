import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Users() {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        bindData();
    }, []);


    function deleteUser(id) {
        alert(id)
        if (window.confirm("Sure to delete?")) {
        axios.delete("https://637fa8985b1cc8d6f94c8187.mockapi.io/users/" + id)
            .then((result) => {
                console.log(result.data);
                bindData();
            })
        }
    }


    function bindData() {
        axios.get("https://637fa8985b1cc8d6f94c8187.mockapi.io/users")
            .then((result) => {
                setUsers(result.data);
                console.log(result.data);

            }, (err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2>Users</h2>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>No</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <Link className='btn btn-primary' to={"edit/" + user.id}><i className='fa fa-edit'></i></Link>&nbsp;

                                        <Button className="btn" onClick={() => deleteUser(user.id)} variant='danger'><i class="fa-solid fa-trash"></i></Button>
                            

                                    </td>
                                    <td>{i + 1}</td>
                                    <td ><img src={user.avatar} alt="" /></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobileno}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default Users