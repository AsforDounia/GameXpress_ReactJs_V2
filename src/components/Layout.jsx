import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './sidebar';

const Layout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const roles = user?.roles?.map(role => role.name);
  const isAdmin = roles?.includes('super_admin') || roles?.includes('product_manager');

  return (
    <>
      {/* Header / Navbar */}
      <header className="bg-gray-800 text-white shadow-lg fixed w-full z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold capitalize">{(!roles || roles == "client") ? "GameXpress" : "Dashboard " + roles} </h1>
          <nav className="flex space-x-4">
            {isAuthenticated ? (
              <>
                {/* {(roles?.includes('super_admin') || roles?.includes('product_manager')) && (
                  <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                    Dashboard
                  </Link>
                )} */}
                <button
                  onClick={logout}
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      {isAdmin ? (
        <>
          <Sidebar />
          <main className="absolute top-1/14 left-1/5 w-2/3 px-4 py-6">
            <Outlet />
          </main>
        </>
      ) : (
        <main className="px-4 py-6">
          <Outlet />
        </main>
      )}

    </>
  );
};

export default Layout;
