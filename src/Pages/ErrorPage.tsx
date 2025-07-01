import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#3A39CE] to-[#ED4250] bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-[#3A39CE] hover:bg-[#2a29a6] text-white"
        >
          Go Home
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
