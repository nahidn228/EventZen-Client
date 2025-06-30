// src/components/module/MyEventCard.tsx
import React, { useState } from "react";
import useAxiosPublic from "@/hook/useAxiosPublic";

interface Event {
  _id: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const MyEventCard: React.FC<{ event: Event; refetch: () => void }> = ({ event, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      setLoading(true);
      await axiosPublic.delete(`/events/${event._id}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const newTitle = prompt("Enter new event title:", event.eventTitle);
    if (newTitle && newTitle !== event.eventTitle) {
      try {
        setLoading(true);
        await axiosPublic.put(`/events/${event._id}`, { eventTitle: newTitle });
        refetch();
      } catch (error) {
        console.error("Failed to update event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border rounded shadow hover:shadow-lg transition p-4 space-y-2 bg-white">
      <h3 className="text-lg font-semibold truncate">{event.eventTitle}</h3>
      <p className="text-sm text-gray-600">
        🧑 Posted by: {event.name}
      </p>
      <p className="text-sm text-gray-500">
        📅 {new Date(event.eventDate).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">📍 {event.location}</p>
      <p className="text-xs text-gray-700 truncate">{event.description}</p>
      <p className="text-xs">🎟️ {event.attendeeCount} attendees</p>
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyEventCard;
