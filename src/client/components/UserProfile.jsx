import React, { useState, useEffect } from 'react'
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap'
import TripView from './TripView'
import InvitationsList from './InvitationsList'
import UserInfo from './UserInfo'
import srv from '../srv'

let userID = ''

const UserProfile = () => {
  // user
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
    dob: '',
    likedDestinations: [],
    trips: [],
    invitations: []
  })

  const [trips, setTrips] = useState([])
  const [activeTab, setActiveTab] = useState('info')
  const [activeTripID, setActiveTripID] = useState()

  const reload = async () => {
    const user = await srv.service('users').get(userID)
    const _trips = []
    for (const _id of user.trips) {
      const trip = await srv.service('trips').get(_id)
      _trips.push(trip)
    }
    setUser(user)
    setTrips(_trips)
  }

  // load logged user info
  useEffect(() => {
    setTimeout(() => {
      const auth = srv.get('authentication')
      auth && auth
        .then(({ user }) => {
          userID = user._id
          reload()
        })
        .catch(console.log)
    })
  }, [])

  const addTrip = async () => {
    const newTrip = await srv.service('trips').create({
      tripName: 'New trip',
      start: '',
      end: '',
      tripEvents: [],
      users: [{
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        status: 'Joined',
        permission: 'Owner'
      }],
      visited: false
    })
    await srv.service('users').update(user._id, { $push: { trips: newTrip._id } })
    await reload()
    setActiveTripID(newTrip._id)
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="info">
      <Row style={{ paddingBottom: 200 }}>
        <Col sm={3}>
          <Nav onSelect={key => setActiveTab(key)} variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="info">My info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onSelect={() => {
                  if (activeTab !== 'trips' && trips.length)
                    setActiveTripID(trips[0]._id)
                }}
                className="d-flex justify-content-between"
                eventKey="trips">
                <span>My trips</span>
                <button
                  className={`close ${activeTab === 'trips' && 'text-white'}`}
                  onClick={addTrip}>
                   +
                </button>
              </Nav.Link>
              {activeTab === 'trips' && (
                <Nav className="flex-column">
                  {trips.map((trip, i) => (
                    <Nav.Item key={trip._id} onClick={() => setActiveTripID(trip._id)}>
                      <Nav.Link className="text-info d-flex justify-content-between" style={{
                        paddingLeft: 40,
                        fontWeight: activeTripID === trip._id && 'bold'
                      }}>
                        {trip.tripName + (trip.visited ? ' (complete)' : '')}
                        <button
                          onClick={ev => {
                            const removes = trip.users.map(e => {
                              srv.service('users').get(e.id).then(user => {
                                const index = user.trips.indexOf(trip._id)
                                user.trips.splice(index, 1)
                                return srv.service('users').update(user._id, user)
                              })
                            })
                            Promise.all(removes)
                              .then(() => srv.service('trips').remove(trip._id))
                              .then(() => reload())
                              .then(() => {
                                if (trip._id === activeTripID) {
                                  const next = trips[i + 1] || trips[i - 1]
                                  setActiveTripID(next && next._id)
                                }
                              })
                            ev.preventDefault()
                            ev.stopPropagation()
                          }}
                          className="close">
                          &times;
                        </button>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="invitations">My Invitations</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="info">
              <UserInfo />
            </Tab.Pane>
            <Tab.Pane eventKey="trips">
              {activeTripID
                ? <TripView
                  tripID={activeTripID}
                  reload={reload}/>
                : (
                  <div>You have no trips</div>
                )}
            </Tab.Pane>
            <Tab.Pane eventKey="invitations">
              <InvitationsList invitationsUser={user} reloadFunction={reload}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}
export default UserProfile
