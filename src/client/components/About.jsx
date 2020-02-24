import React from 'react'
import { Container, Row, Col, Image} from 'react-bootstrap'
import GroupImage from './about_photo.jpg'


const About = () => {
  return(
    <Container>
      <Row>
        <Col>
          <h1>About</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          This website is an ongoing project which students are to work on throughout the Seneca,
          Bachelors of Software Development program. Students pair into groups of 3 and work together
          to come up with a product that aims to create value in some way or form. This project will span
          over the course of 3 semesters. 
        </Col>
        <Col>
          <Image src={GroupImage} alt="asd" width="400" height="400" thumbnail/>
        </Col>
      </Row>
      
    </Container>
  )
  
}

export default About
