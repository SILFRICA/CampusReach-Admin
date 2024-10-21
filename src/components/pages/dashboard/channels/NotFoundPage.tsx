import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <Link 
        to="/dashboard"
        className="px-6 py-3 bg-[#03CF79] text-white hover:bg-[#03CF79] transition-all"
      >
        Go Back To Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
