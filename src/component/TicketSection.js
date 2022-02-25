import { useState, useEffect } from "react";
import { getApi } from "../api/axiosInstance";

const TicketSection = () => {
  const [tickets, setTickets] = useState([]);

  const renderTickets = () => {};

  return (
    <div className="TicketSection">
      <h1>TicketSection</h1>
      <div className="TicketSection-ActiveTickets">
        <p>Active</p>
        <hr />
        {renderTickets()}
      </div>
    </div>
  );
};

export default TicketSection;