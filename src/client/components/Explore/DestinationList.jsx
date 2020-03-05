import React, { useState } from 'react'
import { Card, CardColumns } from 'react-bootstrap'
import Actions from './Actions'

const DestinationCard = ({ destination: dest }) => {
  const href = '#/destination/' + dest._id
  const [destination, setDestination] = useState(dest)
  let desc = dest.description
  desc = desc.slice(0, desc.indexOf('.') + 1)

  return (
    <Card className="col-20">
      <a href={href}>
        <Card.Img variant="top" src={dest.images[0]} />
      </a>
      <Card.Body>
        <Card.Title>
          <a className="card-link" href={href}>{dest.name}</a>
        </Card.Title>
        <Card.Subtitle>
          Votes: {destination.votes}
        </Card.Subtitle>
        <Card.Subtitle>
          <br />
        {destination.label}
        </Card.Subtitle>
        <Card.Text><br />{desc}</Card.Text>
      </Card.Body>
      <Card.Footer className="border-top-0">
        <Actions destination={destination} setDestination={setDestination}/>
      </Card.Footer>
    </Card>
  )
}

const DestinationList = ({ list }) => {
  return (
    <CardColumns>
      {list.map(e =>
        <DestinationCard
          key={e._id}
          destination={e}/>
      )}
    </CardColumns>
  )
}

export default DestinationList
