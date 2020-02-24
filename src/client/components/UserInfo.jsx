import React, { useState } from 'react'
import srv from '../srv'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'

const UserInfo = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
    dob: '',
    likedDestinations: []
  })

  const [deletePrompt, setDeletePrompt] = useState(false)

  const auth = srv.get('authentication')
  auth && auth.then(data => {
    setUser(data.user)
  })
    .catch(console.log)

  return (
    <Container>
      <h1>User Information</h1>
      <Form>
        <Form.Group controlId="usernameForm">
          <Form.Label>Username</Form.Label>         
          <Form.Control type="text" placeholder="Username" value={user.username} readOnly/>
        </Form.Group>
        <Form.Group controlId="statusForm">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" placeholder="status" value={user.status }  onChange={(e) => { user.status = e.target.value; setUser({ ...user }) }}/>
        </Form.Group>
        <Form.Group controlId="firstNameForm">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="First Name" value={user.firstName} onChange={(e) => { user.firstName = e.target.value; setUser({ ...user }) }}/>
        </Form.Group>
        <Form.Group controlId="lastNameForm">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" value={user.lastName }  onChange={(e) => { user.lastName = e.target.value; setUser({ ...user }) }}/>
        </Form.Group>
        <Form.Group controlId="dobForm">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="text" placeholder="dob" value={user.dob }  onChange={(e) => { user.dob = e.target.value; setUser({ ...user }) }}/>
        </Form.Group>
      </Form>

      <Button
            onClick={async () => {console.log(user._id);
              await srv.service('users').update(user._id, user)
              
              //reload()
            }}>
           Update User Info
          </Button>

      <Button
        onClick={() => setDeletePrompt(true)}
        variant="danger ml-2"
        >Delete Account
      </Button>

      <Modal show={deletePrompt} centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this account? The process cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setDeletePrompt(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              srv.logout()
                .then(() => srv.service('users').remove(user._id))
                .then(() => {
                  location.replace('#')
                })
                .catch(console.log)
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default UserInfo
