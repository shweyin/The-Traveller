import React, { useState } from 'react'
import { Container, Row, Column, Button, Form } from 'react-bootstrap'
import srv from '../srv.js'

const SignUp = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [dob, setDob] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const addNewUser = () => {
    srv.service('users').find({
      query: {
        username: username
      }
    }).then((result) => {
      if(result.length == 0) {
        if (username
          && password
          && firstName
          && lastName
          && dob) {
            srv.service('users').create({
              username: username,
              password: password,
              firstName: firstName,
              lastName: lastName,
              description: '',
              dob: dob,
              likedDestinations: [],
              trips: [],
              invitations: []
            }).then(() => {
              console.log("Account has been created")
              location.hash = '#/sign-in'
            })
          }
       
      } else {
        setUserAlreadyExists(true)
      }
    })
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="firstNameForm">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} required/>
          </Form.Group>
          <Form.Group controlId="lastNameForm">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)}required/>
          </Form.Group>
          <Form.Group controlId="dobForm">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" onChange={(e) => setDob(e.target.value)} required/>
          </Form.Group>
          <Form.Group controlId="usernameForm">
            <Form.Label>Desired Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Desired Username" minLength="6" onChange={(e) => setUsername(e.target.value)} required/>
            <Form.Text className="usernameText">
              Username must be at least 6 characters long
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="passwordForm">
            <Form.Label>Desired Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" minLength="8" onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            <Form.Text className="passwordText">
              Password must be at least 8 characters long
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="passwordFormConfirm">
            <Form.Label>Confirm Desired Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => {
                setPassword2(e.target.value)                
            }} required/>
            <Form.Text className={"text-danger " + ((password == password2) ? "invisible" : "visible")}>Password fields must be matching</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addNewUser}>
            Sign Up
          </Button>
          <br></br>
          <label className={"text-danger " + (userAlreadyExists ? "visible" : "invisible")}>An account with that username already exists</label>
        </Form>
      </Container>
    </div>
  )
}
export default SignUp
