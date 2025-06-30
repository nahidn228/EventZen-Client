import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hook/useAxiosPublic";
import MyEventCard from "@/components/module/MyEventCard";

interface IEvent {
  _id: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const MyEvents = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: events = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const currentUser = localStorage.getItem("currentUser");
      const user = currentUser ? JSON.parse(currentUser) : null;
      const email = user?.email;

      if (!email) {
        console.warn("User email not found in localStorage");
        return [];
      }

      const res = await axiosPublic.get(`/events/my-event`, {
        params: {
          email,
        },
      });

      return res.data?.data || [];
    },
  });

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#ED4250]">My Events</h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: IEvent) => (
            <MyEventCard key={event._id} event={event} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
