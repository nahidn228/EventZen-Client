import { Button } from "@/components/ui/button"; // adjust path if needed
import { Link } from "react-router";

const HomeBanner = () => {
  return (
    <section className=" py-10 px-4 md:px-10 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#3A39CE] to-[#ED4250] bg-clip-text text-transparent">
            Manage & Discover Events Effortlessly
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            Join, create, and explore amazing events around you with our
            easy-to-use event management platform.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="bg-[#3A39CE] hover:bg-[#2a29a6] text-white">
              <Link to={"/events"}>Explore Events</Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#ED4250] text-[#ED4250] hover:bg-[#ED4250] hover:text-white"
            >
              <Link to={"/addEvent"}>Create Event</Link>
            </Button>
          </div>
        </div>

        {/* Optional illustration */}
        <div className="flex-1 hidden md:flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
            alt="Event illustration"
            className="rounded-xl shadow-lg max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
