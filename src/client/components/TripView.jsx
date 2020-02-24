import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Form, ListGroup, Modal, Table, Dropdown } from 'react-bootstrap'
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc'
import Select from 'react-select'
import srv from '../srv'

const customSelectStyle = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    backgroundColor: state.isDisabled ? '#e9ecef' : 'auto',
    borderColor: '#ced4da'
  }),
  singleValue: () => ({
    color: '#444',
    fontSize: 14
  })
}

const DragHandle = sortableHandle(() => <div
  className="close"
  style={{ textAlign: 'right', userSelect: 'none' }}>
  &#8801;</div>)

const SortableItem = sortableElement(({ event, destinations, trip, setTrip, editable }) => {
  const destination = destinations.find(e => e._id === event.destinationID)
  return (
    <ListGroup.Item className="container p-0" >
      <Row style={{ height: 180 }}>

        <Col sm={1} className="d-flex justify-content-end align-items-center">
          {editable && <DragHandle/>}
        </Col>
        <Col sm={2} className="d-flex pt-3 flex-column">
          {['Date', 'Destination', 'Description'].map(e => <div style={{ height: 45 }} key={e}>{e}</div>)}
        </Col>

        <Col sm={4} className="d-flex flex-column justify-content-around py-1">

          <Form.Control
            disabled={!editable}
            size="sm"
            type="date"
            value={event.eventDate}
            onChange={e => {
              event.eventDate = e.target.value
              setTrip({ ...trip })
            }}/>

          <Select
            styles={customSelectStyle}
            isDisabled={!editable}
            value={destinations.find(e => e._id === event.destinationID)}
            onChange={e => {
              event.destinationID = e._id
              setTrip({ ...trip })
            }}
            getOptionLabel={e => e.name}
            getOptionValue={e => e._id}
            options={destinations}/>

          <Form.Control
            disabled={!editable}
            as="textarea"
            style={{ resize: 'none' }}
            value={event.description}
            onChange={e => {
              event.description = e.target.value
              setTrip({ ...trip })
            }}/>
        </Col>

        <Col sm={4}>
          {event.destinationID && (
            <img
              src={destination && destination.images[0]}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}/>
          )}
        </Col>
        <Col className="d-flex">
          {editable && (
            <button
              className="close"
              style={{ outline: 'none', cursor: 'default' }}
              onClick={() => {
                const index = trip.tripEvents.findIndex(e => e === event)
                trip.tripEvents.splice(index, 1)
                setTrip({ ...trip })
              }}>
              &times;
            </button>
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  )
})

const SortableContainer = sortableContainer(({ children }) => <ListGroup>{children}</ListGroup>)

const TripView = ({ tripID, reload }) => {
  const [trip, setTrip] = useState({
    tripName: '',
    start: '',
    end: '',
    tripEvents: [],
    users: [],
    visited: false
  })

  const [editable, setEditable] = useState(false)
  const [inviteUsername, setInviteUsername] = useState()
  const [showModal, setShowModal] = useState(false)
  const [modalText, setModalText] = useState('Error: No username input')
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    if (trip.visited) {
      setEditable(false)
      return
    }

    const auth = srv.get('authentication')
    auth && auth.then(({ user }) => {
      const _user = trip.users.find(e => e.id === user._id)
      setEditable(_user && (_user.permission === 'Edit' || _user.permission === 'Owner'))
    })
  }, [trip])

  useEffect(() => {
    srv.service('trips').get(tripID)
      .then(data => setTrip(data))
      .catch(console.log)
  }, [tripID])

  useEffect(() => {
    srv.service('destinations').find()
      .then(setDestinations)
      .catch(console.log)
  }, [])

  const sendInvite = () => {
    srv.service('users').find({
      query: {
        username: inviteUsername
      }
    })
      .then(([user]) => {
        // var inviteFound = user.invitations.find(element => element.inviteTripID === tripID)
        // var tripFound = user.trips.find(element => element._id === tripID)
        if (trip.users.find(e => e.id === user._id)) {
          setModalText('This user has already been invited')
          setShowModal(true)
        } else if (inviteUsername) {
          const invite = {
            inviteTripID: tripID,
            inviteTripName: trip.tripName
          }
          user.invitations.push(invite)
          trip.users.push({
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            status: 'Pending',
            permission: 'View'
          })
          srv.service('users').update(user._id, user)
            .then(() => srv.service('trips').update(trip._id, trip))
            .then(res => {
              reload()
              setModalText('Invitation successully sent!')
              setShowModal(true)
              setTimeout(() => window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              }))
            })
            .catch(() => {
              setModalText("Error: Couldn't update User")
              setShowModal(true)
            })
        }
      })
      .catch((err) => {
        console.log(err)
        setModalText('Error: No User Found')
        setShowModal(true)
      })
  }

  return (
    <Container style={{ paddingLeft: 50, paddingRight: 200 }}>
      <Row className='mt-4'>
        <Col sm={trip.visited ? 12 : 6}>
          <h3>Trip Information {trip.visited && '(complete)'}</h3>
        </Col>
        {editable && <>
          <Col>
            <Button
              className='w-100'
              variant='success'
              onClick={async () => {
                const _trip = await srv.service('trips').get(tripID)
                const auth = srv.get('authentication')
                const user = auth && (await auth).user
                const _user = _trip.users.find(e => e.id === user._id)

                if (!_user || (_user.permission !== 'Edit' && _user.permission !== 'Owner')) {
                  alert('You don\'t have permission to edit this trip!')
                  location.reload()
                  return
                }

                await srv.service('trips').update(tripID, trip)
                reload()
              }}>
              Save
            </Button>
          </Col>
          <Col>
            <Button
              className='w-100 ml-1'
              onClick={async () => {
                trip.visited = true
                await srv.service('trips').update(tripID, trip)
                for (const tripEvent of trip.tripEvents) {
                  if (tripEvent.destinationID) {
                    const dest = await srv.service('destinations').get(tripEvent.destinationID)
                    dest.visits++
                    await srv.service('destinations').update(dest._id, dest)
                  }
                }
                setTrip({ ...trip })
                reload()
              }}>
              Mark Complete
            </Button>
          </Col>
        </>}
      </Row>
      <Dropdown.Divider className='mb-3'/>

      <Row>
        <Col>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={{ offset: 1, span: 2 }}>Trip name</Form.Label>
              <Col sm={6}>
                <Form.Control disabled={!editable} type="text" value={trip.tripName} onChange={e => { trip.tripName = e.target.value; setTrip({ ...trip }) }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={{ offset: 1, span: 2 }}>Start date</Form.Label>
              <Col sm={6}>
                <Form.Control disabled={!editable} type="date" value={trip.start} onChange={e => { trip.start = e.target.value; setTrip({ ...trip }) }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={{ offset: 1, span: 2 }}>End date</Form.Label>
              <Col sm={6}>
                <Form.Control disabled={!editable} type="date" value={trip.end} onChange={e => { trip.end = e.target.value; setTrip({ ...trip }) }} />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col>
          <h3>Trip Events</h3>
        </Col>
      </Row>
      <Dropdown.Divider className='mb-3'/>

      <Row>
        <Col>
          <SortableContainer
            useDragHandle
            onSortEnd={({ oldIndex, newIndex }) => {
              const [event] = trip.tripEvents.splice(oldIndex, 1)
              trip.tripEvents.splice(newIndex, 0, event)
              setTrip({ ...trip })
            }}>

            {trip.tripEvents.map((e, i) => <SortableItem
              key={i}
              index={i}
              event={e}
              destinations={destinations}
              trip={trip}
              setTrip={setTrip}
              editable={editable}/>)}
          </SortableContainer>
        </Col>
      </Row>

      {editable && (
        <Row className='mt-2'>
          <Col sm={9}></Col>
          <Col>
            <Button
              className='w-100'
              disabled={!editable}
              onClick={() => {
                trip.tripEvents.push({
                  eventDate: '',
                  destinationID: '',
                  description: ''
                })
                setTrip({ ...trip })
                setTimeout(() => window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                }))
              }}>
            Add
            </Button>
          </Col>
        </Row>
      )}

      <Row className='mt-4'>
        <Col>
          <h3>Users</h3>
        </Col>
      </Row>
      <Dropdown.Divider className='mb-3'/>

      {/* Invite user */}
      {editable && (
        <Form.Group as={Row}>
          <Form.Label column sm={{ offset: 1, span: 2 }}>Invite user</Form.Label>
          <Col sm={6}>
            <Form.Control type='text' onChange={e => { setInviteUsername(e.target.value) }}/>
          </Col>
          <Col>
            <Button
              className='w-100'
              onClick={sendInvite}>Invite
            </Button>
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row}>
        <Col sm={{ offset: 1 }}>
          <Table size='sm'>
            <thead>
              <tr>
                <th className='border-0 pt-2 text-muted'>User</th>
                <th className='border-0 pt-2 text-muted'>Status</th>
                <th className='border-0 pt-2 text-muted' style={{ width: '24.8%' }}>Permission</th>
              </tr>
            </thead>
            <tbody>
              {trip.users.map(e => (
                <tr key={e.id}>
                  <td className='font-weight-bold text-info'>{e.name}</td>
                  <td className='text-dark'>{e.status}</td>
                  <td className='pr-0'>
                    {e.status !== 'Declined' && (
                      <Form.Control
                        disabled={e.permission === 'Owner' || !editable}
                        size='sm'
                        as='select'
                        value={e.permission}
                        onChange={ev => {
                          e.permission = ev.target.value
                          setTrip({ ...trip })
                        }}>
                        {
                          e.permission === 'Owner' ? <option>Owner</option>
                            : e.status === 'Declined' ? <option></option>
                              : <>
                                <option>View</option>
                                <option>Edit</option>
                              </>
                        }
                      </Form.Control>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Form.Group>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invite User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalText}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default TripView
