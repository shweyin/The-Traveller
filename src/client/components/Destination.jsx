import React, { useState, useEffect } from 'react'
import srv from '../srv'
import {
  Carousel, Badge
  // Container,
  // Row,
  // Col
} from 'react-bootstrap'
import Actions from './Explore/Actions'

const Destination = (props) => {
  const _id = props.match.params.id
  const [destination, setDestination] = useState()

  useEffect(() => {
    srv.service('destinations')
      .get(_id)
      .then(setDestination)
      .catch(() => window.location.replace('#'))


  }, [])

  return !destination
    ? ''
    : <>
      <Carousel style={{ height: 400 }}>
        {destination.images.map(e =>
          <Carousel.Item key={e}>
            <img
              src={e}
              style={{
                width: '100%',
                height: 400,
                objectFit: 'cover'
              }}/>
          </Carousel.Item>
        )}
      </Carousel>
      {/* <Container>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container> */}

      <div className="col-6 mx-auto pb-5">
        <h1 className="mt-3 text-secondary">{destination.name}</h1>
        <div className="dropdown-divider"></div>
        <h6 className="mt-3 text-secondary">Votes: {destination.votes}</h6>
        <h6 className="mt-3 text-secondary">{destination.label?destination.label:''}</h6>

        <p className="mt-3 text-dark">{destination.description}</p>
        <div>
          {destination.moods.map(e =>
            <Badge
              key={e}
              variant="info"
              className="m-1 px-2">
              {e}
            </Badge>
          )}
        </div>
        <Actions destination={destination} setDestination={setDestination}  />
      </div>
    </>
}

export default Destination
