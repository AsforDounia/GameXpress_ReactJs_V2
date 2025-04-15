import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold text-center text-white mb-10">Admin Dashboard</h2>
      <ul>
        <li>
          <NavLink to="/" className="block py-2 px-4 hover:bg-gray-700 rounded"
          activeClassName="bg-gray-700" >
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700" >
            Produits
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/commandes"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700" >
            Commandes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700" >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rapports"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700" >
            Rapports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parametres"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700">
            Paramètres
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;