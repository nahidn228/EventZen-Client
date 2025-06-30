import { useState } from "react";
import useAxiosPublic from "@/hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/module/EventCard";

interface Event {
  _id?: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const Events = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sort, setSort] = useState("desc");

  const {
    data: events = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["events", search, dateFilter, sort],
    queryFn: async () => {
      const res = await axiosPublic.get("/events", {
        params: {
          filter: search,
          dateFilter,
          sortBy: "eventDate",
          sort,
          limit: 20,
        },
      });
      return res.data?.data || [];
    },
  });

  const handleReset = () => {
    setSearch("");
    setDateFilter("");
    setSort("");
    refetch();
  };

  return (
    <div className="w-11/12 md:max-w-screen-xl py-10 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none"
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Date filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border p-4 rounded-md"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="current-week">Current Week</option>
              <option value="last-week">Last Week</option>
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-4 rounded-md"
            >
              <option value="">Sort By Date</option>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            <button onClick={handleReset} className="btn">
              Reset
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && <p className="text-center">Loading events...</p>}

        {/* Event list */}
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.length === 0 && !isLoading && <p>No events found.</p>}
          {events.map((event: Event) => (
            <EventCard key={event._id} event={event} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
