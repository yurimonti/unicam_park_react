import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { privateInstance } from '../api/axiosInstance'

const Ticket = (props) => {
    const [ticket, setTicket] = useState(props.ticket);
    const [details,setDetails] = useState(props.details);
    const [associatedParkInfo, setAssociatedParkInfo] = useState({});
    const [info, setInfo] = useState({
        start: new Date(ticket.start),
        end: new Date(ticket.end)
    });

    useEffect(() => {
        if(details)
        getParkOfTicket();
    }, [ticket]);

    const getParkOfTicket = () => {
        let payload = { parkId: ticket.park_id };
        privateInstance.post('/parks/parkInfo', payload,{
            headers:{'authorization':'Bearer '+localStorage.getItem('token')}
        })
            .then(res => {
                let data = res.data;
                setAssociatedParkInfo(data);
                console.log(res.status);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="Ticket" style={{ display: 'flex' }}>
            {props.details ? 
                <Card
                    bg={props.active ? 'primary' : 'secondary'}
                    text='white'
                    style={{ margin: 'auto' }}
                    className="mb-2"
                >
                    <Card.Header>{props.active ? 'active'.toUpperCase() : 'past'.toUpperCase()}</Card.Header>
                    <Card.Body>
                        <Card.Title>{associatedParkInfo.location?.name + '' + associatedParkInfo.park?.codeNumber}</Card.Title>
                        <Card.Text>
                            start: {info.start?.toLocaleString()} end: {info.end?.toLocaleString()}
                        </Card.Text>
                    </Card.Body>
                </Card> : 
                    <p> start: {info.start?.toLocaleString()} end: {info.end?.toLocaleString()} </p>
            }
        </div>
    )
}

export default Ticket;