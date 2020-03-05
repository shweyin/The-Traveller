import React, {useState, useEffect} from 'react'
import {Table, Container, Row, Col, Button } from 'react-bootstrap'
import srv from '../../srv'

const Popularity = () => {

    const [destinations, setDestinations] = useState([]);
    const [likesDescending, setLikesDescending] = useState(true);
    const [viewsDescending, setViewsDescending] = useState(true);
    const [isLikes, setIsLikes] = useState(true);


    useEffect(() => {
        srv.service('destinations').find().then((res) => {
            if(isLikes === true){
                res.sort((a, b) => {
                    return (likesDescending ? b.votes - a.votes : a.votes - b.votes);
                });
            }
            else {
                res.sort((a, b) => {
                    return (viewsDescending ? b.visits - a.visits : a.visits - b.visits);
                });
            }            
            setDestinations(res);
        });        
    }, [likesDescending, viewsDescending, isLikes]);

    

    return (
        <Container>
            <h1>Popularity</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Destination</th>
                        <th onClick={() => {
                            setLikesDescending(!likesDescending);
                            setIsLikes(true);
                        }}><Button block variant="light">Likes {likesDescending ? "(Descending)" : "(Ascending)"}</Button></th>
                        <th onClick={() => {
                            console.log("Vists on click")
                            setViewsDescending(!viewsDescending);
                            setIsLikes(false);
                            console.log(isLikes);
                        }}><Button block variant="light">Visits {viewsDescending ? "(Descending)" : "(Ascending)"}</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {destinations.map((destination, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><a href={"#/destination/" + destination._id}>{destination.name}</a></td>
                            <td>{destination.votes}</td>
                            <td>{destination.visits}</td>
                        </tr>
                    ))} 
                </tbody>
            </Table>
        </Container>
        
    );
}


export default Popularity;