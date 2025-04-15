import { useDashboard } from '../context/DashboardContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { data } = useDashboard();

  console.log(data);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="container mx-auto mt-4 mb-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome back, {user.name} ({user.roles[0].name})
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Products</p>
              <div className="text-blue-500">🛒</div>
            </div>
            <p className="text-xl font-semibold">{data.total_products}</p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Users</p>
              <div className="text-blue-500">👥</div>
            </div>
            <p className="text-xl font-semibold">{data.total_users}</p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Orders</p>
              <div className="text-blue-500">📊</div>
            </div>
            <p className="text-xl font-semibold">0</p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Revenue</p>
              <div className="text-blue-500">📈</div>
            </div>
            <p className="text-xl font-semibold">$0</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
