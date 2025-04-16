import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './SideBar';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const roles = user?.roles?.map(role => role.name);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isProductsPage = location.pathname === '/products' || location.pathname === '/productdetails/:id';

  return (
    <div className='bg-gray-50'>
      {!isAuthPage && (
        <header className="bg-blue-950 text-white fixed top-0 left-0 w-full z-10 shadow-md h-16 flex flex-col justify-center px-2 z-40">
          <div className="container px-12 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold capitalize">{(!roles || roles == "client") ? "GameXpress" : "Dashboard " + roles} </h1>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* {(roles?.includes('super_admin') || roles?.includes('product_manager')) && (
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  )} */}
                  <Link to="/profile" className="hover:underline">
                    Profile
                  </Link>
                  <button onClick={logout} className="hover:underline cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {!isProductsPage && (
                    <Link to="/products" className="hover:underline">
                      Products
                    </Link>

                  )
                  }
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </>
              )}
                  <Link to="/PanierSideBar" className="hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                  </Link>
            </div>
          </div>
        </header>
      )}
      <div className="flex">
        {/* Sidebar will only be shown if the user is roles super_admin */}
        {isAuthenticated && roles?.includes('super_admin') && (
          <div className="hidden md:block w-64 bg-gray-200 min-h-screen">
            <Sidebar />
          </div>
        )}

        <main className="container mx-auto px-4 mt-8 relative top-16 w-3/4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

