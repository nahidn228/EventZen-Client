import useAxiosPublic from "@/hook/useAxiosPublic";
import { useState } from "react";

interface Event {
  _id?: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const EventCard: React.FC<{ event: Event; refetch: () => void }> = ({
  event,
  refetch,
}) => {
  const [isJoining, setIsJoining] = useState(false);

  const axiosPublic = useAxiosPublic();

  const handleJoinEvent = async () => {
    if (!event._id) return;

    try {
      setIsJoining(true);

      const currentUser = localStorage.getItem("currentUser");
      const user = currentUser ? JSON.parse(currentUser) : null;
      const token = user?.token;
      const email = user?.token;

      if (!email) {
        return alert("You have to login first to join our event");
      }

      await axiosPublic.put(`/events/join/${event._id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await refetch();
    } catch (error: unknown) {
      console.error("Failed to join event:", error);
      alert(`${error?.response?.data?.message}`);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transform transition duration-300 flex flex-col justify-between">
      {/* Event image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559027615-b460f1aa8d5f?auto=format&fit=crop&w=800&q=80"
          alt={event.eventTitle}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
        />
        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center">
          <button
            onClick={handleJoinEvent}
            disabled={isJoining}
            className="px-4 py-2 rounded-md bg-[#3A39CE] hover:bg-[#2a29a6] text-white disabled:opacity-50 transition"
          >
            {isJoining ? "Joining..." : "Join Event"}
          </button>
        </div>
      </div>

      {/* Event content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
            {event.eventTitle}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            📍 <span className="truncate">{event.location}</span>
            <span className="mx-1">|</span> 🗓{" "}
            {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Name: <span className="font-medium">{event.name}</span>{" "}
            &nbsp;|&nbsp; 🎟️ {event.attendeeCount} attendees
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* always at the bottom */}
        <div className="h-1 w-16 bg-[#ED4250] rounded mt-3"></div>
      </div>
    </div>
  );
};

export default EventCard;
