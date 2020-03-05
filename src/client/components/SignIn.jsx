import React, { useState } from 'react'
import { Container, Row, Column, Button, Form } from 'react-bootstrap'
import srv from '../srv'

const Signin = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [textHidden, setTextHidden] = useState('invisible')

  const signIn = () => {
    // srv.service('users').create();
    srv.authenticate({
      strategy: 'local',
      username: username,
      password: password
    })
      .then(() => {
        location.hash = '#'
      })
      .catch(() => {
        setTextHidden('visible')
      })

    // console.log(username, password)
    // console.log('user has signed in')
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="usernameForm">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} required/>
          </Form.Group>
          <Form.Group controlId="passwordForm">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required/>
          </Form.Group>
          <Form.Text className="text-muted">
                        Don't have an account with us yet? Sign up <a href="#sign-up">here</a>
          </Form.Text>
          <Button variant="primary" type="submit" onClick={signIn}>
                        Login
          </Button>
          <Form.Text className={'text-danger ' + textHidden} >You have entered an incorrect username or password</Form.Text>
        </Form>

      </Container>

    </div>
  )
}

export default Signin
