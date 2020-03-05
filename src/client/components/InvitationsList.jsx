import React, { useState, useEffect } from 'react'
import srv from '../srv'
import { Button, Container, Row, Col, Form, ListGroup, Toast } from 'react-bootstrap'

const InvitationsList = ({ invitationsUser: user, reloadFunction }) => {
  const [toasts, setToasts] = useState([])

  var validToasts = []
  user.invitations.map((res, index) => (
    validToasts[index] = toasts[index]
  ))

  return (
    <Container>
      <h1>Invitations</h1>
      {user.invitations.map((invite, index) => (
        <Toast key={index} show={toasts[index]} onClose={() => {
          // decline invitation
          srv.service('trips').get(invite.inviteTripID)
            .then(trip => {
              trip.users.find(e => e.id === user._id).status = 'Declined'
              return srv.service('trips').update(trip._id, trip)
            })
            .then(() => {
              user.invitations.splice(
                user.invitations.findIndex(obj => obj.inviteTripID === invite.inviteTripID), 1
              )
              return srv.service('users').update(user._id, user)
            })
            .then(() => {
              validToasts[index] = false
              setToasts(validToasts)
            })
            .catch(console.log)
        }}>
          <Toast.Header>
            <strong className="mr-auto">{invite.inviteTripName}</strong>
            <small><Button onClick={() => {
              validToasts[index] = false
              setToasts(validToasts)
              user.trips.push(invite.inviteTripID)
              user.invitations.splice(
                user.invitations.findIndex(obj => obj.inviteTripID === invite.inviteTripID), 1
              )
              srv.service('trips').get(invite.inviteTripID)
                .then(trip => {
                  trip.users.find(e => e.id === user._id).status = 'Joined'
                  return srv.service('trips').update(trip._id, trip)
                })
                .then(() => srv.service('users').update(user._id, user))
                .then(res => reloadFunction())
            }}>Join</Button></small>
          </Toast.Header>
          <Toast.Body>A user has invited you to join thier trip!</Toast.Body>
        </Toast>
      ))}

    </Container>
  )
}

export default InvitationsList
