
import React from 'react';
import { Ticket, TicketStatus } from '../types';

const getStatusStyles = (status: TicketStatus): string => {
  switch (status) {
    case TicketStatus.Open:
      return 'bg-red-100 text-red-800';
    case TicketStatus.InProgress:
      return 'bg-yellow-100 text-yellow-800';
    case TicketStatus.Resolved:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0 w-full sm:w-32 h-32">
        <img
          src={`data:image/jpeg;base64,${ticket.image}`}
          alt="Issue"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-800">To: {ticket.department}</p>
            <p className="text-xs text-gray-500">{ticket.id} &bull; {ticket.timestamp}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusStyles(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-700">{ticket.description}</p>
      </div>
    </div>
  );
};

export default TicketCard;
