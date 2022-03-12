import { useState, useEffect } from "react";
import { privateInstance } from "../api/axiosInstance";
import Ticket from "./Ticket";

const TicketSection = () => {
  const [activeTickets, setActiveTickets] = useState([]);
  const [pastTickets, setPastTickets] = useState([]);

  useEffect(()=>{
    getTickets();
  },[])


  const getTickets = ()=>{
    privateInstance.get('/tickets',{
      headers:{'authorization':'Bearer '+localStorage.getItem('token')}
    })
      .then(res=>{
        setActiveTickets(res.data.activeTickets);
        setPastTickets(res.data.pastTickets);
      }).catch(err=>{
        console.log(err);
      })
  }

  const renderActiveTickets = () => {
    return activeTickets.map(t =>{return(<Ticket active={true} details={true} ticket={t} key={t.id} />)})
  };
  
  const renderPastTickets = () => {
    return pastTickets.map(t =>{return(<Ticket details={true} ticket={t} key={t.id} />)})
  };

  return (
    <div className="TicketSection">
      <h1>TicketSection</h1>
      <div className="TicketSection-ActiveTickets">
        <p>Active</p>
        <hr />
        {renderActiveTickets()}
      </div>
      <div className="TicketSection-PastTickets">
        <p>Past</p>
        <hr />
        {renderPastTickets()}
      </div>
    </div>
  );
};

export default TicketSection;