import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Filters from './Filters'
import DestinationList from './DestinationList'

const Explore = app => {
  // fetch destinations based on query
  const [destinations, setDesitnations] = useState([])

  return (
    <Container>
      <Row>
        <Col md={5} lg={4}>
          <Filters setDesitnations={setDesitnations}/>
        </Col>
        <Col md={7} lg={8}>
          <DestinationList list={destinations}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Explore
