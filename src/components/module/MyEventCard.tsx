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

const MyEventCard: React.FC<{ event: Event; refetch: () => void }> = ({
  event,
  refetch,
}) => {
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
    <div className="  border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition p-4 space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {event.eventTitle}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🧑 Posted by: {event.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          📅 {new Date(event.eventDate).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          📍 {event.location}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
          {event.description}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          🎟️ {event.attendeeCount} attendees
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 px-3 py-1 rounded-md bg-[#3A39CE] hover:bg-[#2a29a6] text-white disabled:opacity-50 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 px-3 py-1 rounded-md bg-[#ED4250] hover:bg-[#c7333e] text-white disabled:opacity-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyEventCard;
