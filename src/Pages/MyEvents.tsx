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
      const res = await axiosPublic.get(`/my-event`);
      return res.data?.data || [];
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto p-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Events</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
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
