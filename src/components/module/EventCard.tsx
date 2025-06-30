import React from "react";

interface Event {
  _id?: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 bg-white">
      {/* Event image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559027615-b460f1aa8d5f?auto=format&fit=crop&w=800&q=80"
          alt={event.eventTitle}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
        />
        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>

      {/* Event content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {event.eventTitle}
        </h3>
        <p className="text-sm text-gray-500">
          📍 {event.location} &nbsp;|&nbsp; 🗓{" "}
          {new Date(event.eventDate).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-600">
          Host: <span className="font-medium">{event.name}</span> | 🎟️{" "}
          {event.attendeeCount} attendees
        </p>
        <p className="text-gray-700 text-sm truncate">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
