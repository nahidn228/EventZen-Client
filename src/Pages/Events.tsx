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
    <div className=" w-11/12 md:max-w-screen-xl py-10 mx-auto min-h-screen flex flex-col gap-8">
      {/* Filters section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="flex rounded-lg border border-[#ED4250] focus-within:ring-2 focus-within:ring-[#ED4250] transition">
            <input
              className="px-4 py-2 w-full md:w-64 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-500 outline-none rounded-lg"
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
            className="border border-[#3A39CE] dark:bg-gray-800 dark:text-gray-200 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-[#3A39CE] transition"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="current-week">Current Week</option>
            <option value="last-week">Last Week</option>
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>

        <div className="flex gap-4 items-center w-full md:w-auto">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-[#3A39CE] dark:bg-gray-800 dark:text-gray-200 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-[#3A39CE] transition"
          >
            <option value="">Sort By Date</option>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-[#ED4250] text-white hover:bg-[#c9333e] transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading events...
        </p>
      )}

      {/* Event list */}
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.length === 0 && !isLoading && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No events found.
          </p>
        )}
        {events.map((event: Event) => (
          <EventCard key={event._id} event={event} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Events;
