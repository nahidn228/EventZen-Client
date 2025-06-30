const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.03 1.36 5.73 3.5 7.5L12 22l6.5-2.5C20.64 17.73 22 15.03 22 12c0-5.52-4.48-10-10-10zm0 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2-4h4v-2h-4v2zm0-4h4V7h-4v2z" />
      </svg>
      {/* Logo text */}
      <span className="font-bold text-xl hidden sm:inline">EventZen</span>
    </div>
  );
};

export default Logo;
