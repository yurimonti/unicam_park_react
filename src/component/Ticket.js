import { useEffect,useState } from "react";

const Ticket = (props)=>{
    const[ticket,setTicket] = useState(props.ticket);

    return(
        <div className="Ticket" style={{display:'flex'}}>
            <p> start: {ticket.start} end: {ticket.end} </p>
        </div>
    )
}

export default Ticket;