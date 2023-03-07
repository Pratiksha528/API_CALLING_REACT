import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function User() {

  let navigate = useNavigate();
  let { id } = useParams();
  

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileno: ""
  });

  useEffect(() => {
    if (id !== undefined) {
      axios.get("https://637fa8985b1cc8d6f94c8187.mockapi.io/users/" + id).then((result) => {
        console.log(result.data);
        setUser({
          name: "result.data.name",
          email: "result.data.email",
          mobileno: "result.data.mobileno"
        })
      }, (err) => {
        console.log(err);
      })
    }
    else {
      setUser({
        name: "",
        email: "",
        mobileno: ""
      })
    }
  }, [id])

  const [userValidation, setUserValidation] = useState(
    {
      nameMessage: "",
      emailMessage: "",
      mobileNoMessage: ""
    }
  )


  function handleChange(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  }


  function submit(e) {
    e.preventDefault();
    let validated = true;
    let nameMessage = "";
    let emailMessage = "";
    let mobileNoMessage = "";

    if (user.name.trim() === "") {
      nameMessage = "Please Enter Name";
      validated = false;
    }

    if (user.email.trim() === "") {
      emailMessage = "Please Enter Email";
      validated = false;
    }

    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      emailMessage = "Please Enter Valid Email";
      validated = false;

    }
    if (user.mobileno.trim() === "") {
      mobileNoMessage = "Please Enter MobileNo";
      validated = false;
    }

    else if (!/^(?:(?:\+|0{0,2})91(\s*)?|[0]?)?[789]\d{9}$/.test(user.mobileno)) {
      mobileNoMessage = "Please Enter Valid Mobile No";
      validated = false;

    }
    setUserValidation({
      nameMessage: nameMessage,
      emailMessage: emailMessage,
      mobileNoMessage: mobileNoMessage

    })
    if (validated) {
      if(id===undefined){
      axios.post("https://637fa8985b1cc8d6f94c8187.mockapi.io/users", user).then((result) => {
        navigate("/");
        
      }, (err) => {
        console.log(err);
      })
    }
    else{
      axios.put("https://637fa8985b1cc8d6f94c8187.mockapi.io/users/"+id , user).then((result) => {
        navigate("/");
      }, (err) => {
        console.log(err);
      })
    }
    }
    else {
      return;
    }
  }


  return (
    <div>
      <h2>User</h2><hr />
      <Form onSubmit={(e) => { submit(e) }}>

        <Form.Group className="mb-3" >
          <Form.Label>Name<span className='text-danger'>{userValidation.nameMessage}</span></Form.Label>
          <Form.Control type="name" id='name' placeholder="Enter Name" value={user.name} onChange={(e) => { handleChange(e) }} />

          <Form.Label>Email address<span className='text-danger'>{userValidation.emailMessage}</span></Form.Label>
          <Form.Control type="text" id='email' placeholder="Enter email" value={user.email} onChange={(e) => { handleChange(e) }} />


        </Form.Group>

        <Form.Label>Mobile No<span className='text-danger'>{userValidation.mobileNoMessage}</span></Form.Label>
        <Form.Control type="number" id='mobileno' placeholder="Enter Mobile No" value={user.mobileno} onChange={(e) => { handleChange(e) }} /><br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default User;