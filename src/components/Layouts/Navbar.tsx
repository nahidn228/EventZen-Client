import { NavLink } from "react-router";
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

const NewNavbar = () => {
   const navLinks = (
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "bg-blue-700" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/meals"
            className={({ isActive }) => (isActive ? "bg-blue-700" : "")}
          >
            Meals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/upcomingMeals"
            className={({ isActive }) => (isActive ? "bg-blue-700" : "")}
          >
            Upcoming
          </NavLink>
        </li>
      </>
    );
  return (
    <div className=" shadow-sm">

   
    <div className="shadow-sm ">
         <div className="navbar max-w-screen-2xl mx-auto">
           <div className="navbar-start">
             <div className="dropdown">
               <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-5 w-5"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                 >
                   {" "}
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M4 6h16M4 12h8m-8 6h16"
                   />{" "}
                 </svg>
               </div>
               <ul
                 tabIndex={0}
                 className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
               >
                 {navLinks}
               </ul>
             </div>
             <a className="btn btn-ghost text-xl">EventZen</a>
           </div>
           <div className="navbar-center hidden lg:flex">
             <ul className="menu menu-horizontal px-1">{navLinks}</ul>
           </div>
           <div className="navbar-end">
             <div className="flex items-center gap-2">
               <div className="dropdown dropdown-end">
                 <ModeToggle />
               </div>
               <div className="dropdown dropdown-end">
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <div
                       tabIndex={0}
                       role="button"
                       className="btn btn-ghost btn-circle avatar"
                     >
                       <div className="w-12 rounded-full">
                         <img
                           alt="Tailwind CSS Navbar component"
                           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                         />
                       </div>
                     </div>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="w-56" align="start">
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuGroup>
                       <DropdownMenuItem>
                         Profile
                         <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                         Billing
                         <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                         Settings
                         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                         Keyboard shortcuts
                         <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                       </DropdownMenuItem>
                     </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                       <DropdownMenuItem>Team</DropdownMenuItem>
   
                       <DropdownMenuItem>
                         New Team
                         <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                       </DropdownMenuItem>
                     </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>GitHub</DropdownMenuItem>
                     <DropdownMenuItem>Support</DropdownMenuItem>
                     <DropdownMenuItem disabled>API</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                       Log out
                       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  );
};

export default NewNavbar;
