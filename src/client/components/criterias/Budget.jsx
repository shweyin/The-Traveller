import React, { useState } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'
import qs from 'qs'

const Budget = () => {

    const [value, setValue] = useState(5000);
    const [value2, setValue2] = useState(5000);

    const setLowBudget = () => {
        setValue(3000);
        setValue2(5000);
    };
    const setMedBudget = () => {
        setValue(5000);
        setValue2(7000);
    };
    const setHighBudget = () => {
        setValue(8000);
        setValue2(10000);
    };

    const query = {
        budget: {
            Min: value,
            Max: value2
        }
    }

    const string = qs.stringify(query);

    return(
    <Container>
        <Row >
            <Col></Col>
            <Col><h1>Budget</h1></Col>
            <Col></Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col>
                <Button variant="outline-success" onClick={setLowBudget}>Low Budget</Button>
            </Col>
            <Col>
                <Button variant="outline-warning" onClick={setMedBudget}>Medium Budget</Button>
            </Col>
            <Col>
                <Button variant="outline-danger" onClick={setHighBudget}>High Budget</Button>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <div className="my-5">
                <label>${value}</label>
                <input type="range" className="custom-range" max="10000" value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className="my-5">
                <label>${value2}</label>
                <input type="range" className="custom-range" max="10000" value={value2} onChange={(e) => setValue2(e.target.value)}/>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">            
            <Button variant="info" href={"#explore?" + string}>Next</Button>
        </Row>
      </Container>
    );
}

export default Budget
