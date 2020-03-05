// const Mood = () => 'Mood'

import React, { useState } from 'react'
import { Container, Button, Card, CardDeck, Row, Col, ListGroup } from 'react-bootstrap'
import qs from 'qs'

// mport React from 'react';

const Mood = () => {
  const [mood1, setValue1] = useState(null)
  const [mood2, setValue2] = useState(null)
  const [mood3, setValue3] = useState(null)
  const [mood4, setValue4] = useState(null)
  const [mood5, setValue5] = useState(null)
  const [mood6, setValue6] = useState(null)

  const showMoodsList = (change) => {
    var moods_ = document.getElementById('moodsOutput')
    moods_.innerHTML = '<ListGroup >'

    if (mood1 && change != 'r1' || change == 'm1')
      moods_.innerHTML += ' <ListGroupItem> Nature  </ListGroupItem> <br/>'

    if (mood2 && change != 'r2' || change == 'm2')
      moods_.innerHTML += ' <ListGroupItem> Nightlife  </ListGroupItem> <br/>'

    if (mood3 && change != 'r3' || change == 'm3')
      moods_.innerHTML += ' <ListGroupItem> Relax  </ListGroupItem> <br/>'

    if (mood4 && change != 'r4' || change == 'm4')
      moods_.innerHTML += ' <ListGroupItem> Sightseeing </ListGroupItem> <br/>'

    if (mood5 && change != 'r5' || change == 'm5')
      moods_.innerHTML += ' <ListGroupItem>Festivals and events </ListGroupItem> <br/>'

    if (mood6 && change != 'r6' || change == 'm6')
      moods_.innerHTML += ' <ListGroupItem> Adventure  </ListGroupItem> <br/>'

    moods_.innerHTML += '</ListGroup>'
  }

  const addMood1 = () => {
    console.log('1mood1= ' + mood1)
    setValue1('Nature')
    // showMoodsList()

    console.log('2mood1= ' + mood1)
    showMoodsList('m1')
    console.log('3mood1= ' + mood1)
  }

  const addMood2 = () => {
    setValue2('Nightlife')
    showMoodsList('m2')
    check=true;
  }

  const addMood3 = () => {
    setValue3('Relax')
    showMoodsList('m3')
  }

  const addMood4 = () => {
    setValue4('Sightseeing')
    showMoodsList('m4')
  }

  const addMood5 = () => {
    setValue5('Festivals and events')
    showMoodsList('m5')
  }

  const addMood6 = () => {
    setValue6('Adventure')
    showMoodsList('m6')
  }

  const removeMood1 = () => {
    setValue1(null)
    showMoodsList('r1')
  }

  const removeMood2 = () => {
    setValue2(null)
    showMoodsList('r2')
  }

  const removeMood3 = () => {
    setValue3(null)
    showMoodsList('r3')
  }

  const removeMood4 = () => {
    setValue4(null)
    showMoodsList('r4')
  }

  const removeMood5 = () => {
    setValue5(null)
    showMoodsList('r5')
  }

  const removeMood6 = () => {
    setValue6(null)
    showMoodsList('r6')
  }

  /* const moods = [
        'Nature',
        'Nightlife',
        'Relax',
        'Sightseeing',
        'Festivals and events',
        'Advenure'
      ] */
  const query = {
    moods: [mood1, mood2, mood3, mood4, mood5, mood6
    ]
  }
  const filtered = {
    moods: query.moods.filter(e => Boolean(e))
  }
  const string = qs.stringify(filtered)


//
var check=false;

  return (

    <Container>

      <h3 style={{ textAlign: 'center' }}> Choose your next destination by mood </h3>
      <br/>
      <Row>
        <Col md={9} >

          <CardDeck >
            <Card bg="light" >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Nature</Card.Header>
              <Card.Img img src="https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg" height="200" width="300" />
              <Card.Body>
                <Button  variant={mood1?"danger":"primary"} onClick={mood1?removeMood1:addMood1} >{mood1?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

            <Card >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Nightlife</Card.Header>
              <Card.Img variant="top" img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ6sNkKYXGvBsEeaxReMNK7Wxqwuiz073oWD-AKNFykGhUyPAi" height="200" width="300" />
              <Card.Body>
              <Button variant={mood2?"danger":"primary"} onClick={mood2?removeMood2:addMood2} >{mood2?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

            <Card >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Relax</Card.Header>
              <Card.Img variant="top" img src="https://besthqwallpapers.com/Uploads/22-3-2018/45317/thumb2-people-on-the-beach-travel-concepts-sea-tropical-islands-ocean.jpg" height="200" width="300" />
              <Card.Body>
              <Button variant={mood3?"danger":"primary"} onClick={mood3?removeMood3:addMood3} >{mood3?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

          </CardDeck>
          <br/>

          <CardDeck >
            <Card >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Sightseeing</Card.Header>
              <Card.Img variant="top" img src="https://i.ytimg.com/vi/I1a_UBrfdII/maxresdefault.jpg" height="200" width="300" />
              <Card.Body>
              <Button variant={mood4?"danger":"primary"} onClick={mood4?removeMood4:addMood4} >{mood4?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

            <Card >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Festivals and Events</Card.Header>
              <Card.Img variant="top" img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_65,w_845/v1/clients/vancouverbc/10-free-events-and-festivals_bfe7c8e4-86aa-4ab5-bd98-34750632db96.jpg" height="200" width="300" />
              <Card.Body>
              <Button variant={mood5?"danger":"primary"} onClick={mood5?removeMood5:addMood5} >{mood5?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

            <Card >
              <Card.Header style= {{ textAlign: 'center' }} as="h5">Adventure</Card.Header>
              <Card.Img variant="top" img src="https://warnercnr.colostate.edu/wp-content/uploads/sites/2/2017/04/shutterstock_428626417-1024x683.jpg" height="200" width="300" />
              <Card.Body>
              <Button variant={mood6?"danger":"primary"} onClick={mood6?removeMood6:addMood6} >{mood6?'Remove':'Add'} </Button>
              </Card.Body>
            </Card>

          </CardDeck>
        </Col>

        <Col md={3} >

          <Card style= {{ textAlign: 'center' }} style={{ width: '20rem', height: '38rem' }}>
            <Card.Header style= {{ textAlign: 'center' }} as="h5">Chosen moods</Card.Header>
            <Card.Body id="moodsOutput">

            </Card.Body >

          </Card>
          <br/>
          <Button variant="info" style={{ position: 'absolute', right: 0 }} href={'#explore?' + string}>Next</Button>
        </Col>
      </Row>

    </Container>

  )
}

export default Mood
