import { NavLink, useNavigate } from "react-router";
import { ModeToggle } from "../mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAxiosPublic from "@/hook/useAxiosPublic";
import { useEffect } from "react";


const NewNavbar = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const userStr = localStorage.getItem("data");
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.data?.data?.[0]?.name;
  const userEmail = user?.data?.data?.[0]?.email;
  const userPhoto = user?.data?.data?.[0]?.photoURL;

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[#ED4250] underline underline-offset-4"
              : "font-medium  hover:text-[#ED4250] transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[#ED4250] underline underline-offset-4"
              : "font-medium  hover:text-[#ED4250] transition"
          }
        >
          Events
        </NavLink>
      </li>
      {userEmail ? (
        <>
          <li>
            <NavLink
              to="/addEvent"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[#ED4250] underline underline-offset-4"
                  : "font-medium  hover:text-[#ED4250] transition"
              }
            >
              Add Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myEvents"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[#ED4250] underline underline-offset-4"
                  : "font-medium  hover:text-[#ED4250] transition"
              }
            >
              My Events
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[#ED4250] underline underline-offset-4"
                  : "font-medium  hover:text-[#ED4250] transition"
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[#ED4250] underline underline-offset-4"
                  : "font-medium  hover:text-[#ED4250] transition"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userStr = localStorage.getItem("currentUser");
        const user = userStr ? JSON.parse(userStr) : null;
        const email = user?.email;
        if (!email) return;
        const { data } = await axiosPublic.get(`/users/current-user`, {
          params: { email },
        });
        localStorage.setItem("data", JSON.stringify({ data }));
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };
    fetchCurrentUser();
  }, [axiosPublic]);

  return (
    <div className="bg-background shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Logo & mobile menu */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-background rounded-box w-52 space-y-1 border border-border"
              >
                {navLinks}
              </ul>
            </div>
          </div>
          <img
            src="./Untitled.jpg"
            alt="Logo"
            className="h-8 w-auto md:h-10 lg:h-12 object-contain rounded-xl  border-2"
          />
        </div>

        {/* Center nav links */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">{navLinks}</ul>
        </div>

        {/* Right: Mode toggle & user */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="tooltip tooltip-bottom"
                data-tip={userName || "User"}
              >
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full overflow-hidden ring-2 ring-primary/50 hover:ring-primary transition">
                    <img
                      alt="User avatar"
                      src={
                        userPhoto ||
                        `https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`
                      }
                    />
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="truncate">
                My Account ({userName})
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {userEmail ? (
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate("/login")}
                  className="cursor-pointer"
                >
                  Log in
                  <DropdownMenuShortcut>⇧⌘</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
