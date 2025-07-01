import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="max-w-screen-2xl mx-auto px-6 py-10 sm:flex sm:justify-between sm:items-center">
        {/* Left side: logo + copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <img
            src="./Untitled.jpg"
            alt="Logo"
            className="h-12 w-auto rounded-xl border-2 border-border"
          />
          <p className="text-sm text-muted-foreground select-none">
            &copy; {new Date().getFullYear()} EventZen. All rights reserved.
          </p>
        </div>

        {/* Center: navigation links */}
        <nav className="mt-8 sm:mt-0">
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { label: "Home", to: "/" },
              { label: "Events", to: "/events" },
              { label: "Add Event", to: "/addEvent" },
              { label: "My Events", to: "/myEvents" },
              { label: "Login", to: "/login" },
              { label: "Register", to: "/registration" },
            ].map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#ED4250] underline underline-offset-4 font-semibold"
                      : "hover:text-[#ED4250] transition font-medium"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: social media icons */}
        <div className="mt-8 sm:mt-0 flex justify-center gap-6">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-[#ED4250] transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12a10 10 0 10-11.6 9.9v-7h-3v-3h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 2v2.3h3.4l-.5 3h-2.9v7A10 10 0 0022 12z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-muted-foreground hover:text-[#ED4250] transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6 0-.2 0-.4 0-.5A8.4 8.4 0 0022 5.4a8.2 8.2 0 01-2.4.7 4.2 4.2 0 001.8-2.3 8.4 8.4 0 01-2.7 1 4.2 4.2 0 00-7.2 3.8 12 12 0 01-8.7-4.4 4.2 4.2 0 001.3 5.6 4.2 4.2 0 01-1.9-.5v.1a4.2 4.2 0 003.4 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.4 8.4 0 016 17.3 11.8 11.8 0 012 18a16.7 16.7 0 009 2.6" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-[#ED4250] transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4.98 3.5A2.5 2.5 0 002.5 6v12a2.5 2.5 0 002.48 2.5h14.98a2.5 2.5 0 002.5-2.5V6a2.5 2.5 0 00-2.5-2.5H4.98zm.02 4h3v10h-3V7.5zm1.5-2.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM8 17.5h3v-5.5a1.75 1.75 0 013.5 0v5.5h3v-6.5a4.25 4.25 0 00-8.5 0v6.5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Optional legal links */}
      <div className="max-w-screen-2xl mx-auto px-6 py-4 border-t border-border text-center text-xs text-muted-foreground select-none">
        <p>
          <NavLink
            to="/privacy-policy"
            className="hover:text-[#ED4250] transition mx-2"
          >
            Privacy Policy
          </NavLink>
          |
          <NavLink
            to="/terms"
            className="hover:text-[#ED4250] transition mx-2"
          >
            Terms of Service
          </NavLink>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
