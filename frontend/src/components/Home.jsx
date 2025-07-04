import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to MERN Authentication
        </h1>
        
        {user ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              You are logged in!
            </h2>
            <p className="text-green-700 mb-6">
              Hello, {user.name}! You can now access your profile and manage your account.
            </p>
            <div className="space-x-4">
              <Link
                to="/profile"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
              >
                View Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Get Started
            </h2>
            <p className="text-blue-700 mb-6">
              Please login or register to access your account and manage your profile.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg inline-block"
              >
                Register
              </Link>
            </div>
          </div>
        )}
        
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Built with JWT tokens and secure password hashing for maximum security.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              User Management
            </h3>
            <p className="text-gray-600">
              Complete user profile management with update and delete capabilities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Modern UI
            </h3>
            <p className="text-gray-600">
              Clean and responsive design built with React and modern CSS frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 