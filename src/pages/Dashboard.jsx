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
    <>
      {data && (

        <div className="">
          {/* <Sidebar /> */}
          <div className="container mx-auto mt-4 mb-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg text-gray-600 mb-4">
              Welcome back, {user.name} ({user.roles[0].name})
            </p>

            <div className="grid grid-cols-4  gap-4 mt-2">
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
                  <p className="text-sm text-gray-500">Total Categories</p>
                  <div className="text-blue-500">📊</div>
                </div>
                <p className="text-xl font-semibold">{data.total_categories}</p>
              </div>

              <div className="bg-white p-4 shadow-md rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Total Sub_Categories</p>
                  <div className="text-blue-500">📈</div>
                </div>
                <p className="text-xl font-semibold">{data.total_subcategories}</p>
              </div>
            </div>

            <div className="mt-10 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Products with Low Stock</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">
                        Product Name
                      </th>
                      <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.low_stock_products.map((product, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 border-b text-sm text-gray-700">
                          {product.name}
                        </td>
                        <td className="px-4 py-2 border-b text-sm text-gray-700">
                          {product.stock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.low_stock_products.length === 0 && (
                  <p className="text-sm text-gray-500 mt-4">
                    No low-stock products found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
