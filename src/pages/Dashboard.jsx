"use client"

import { Routes, Route, Link, useLocation } from "react-router-dom"
import {
  User,
  Calendar,
  Clock,
  Car,
  CreditCard,
  Settings,
  HomeIcon,
  ChevronRight,
} from "lucide-react"

// Dashboard Components
import DashboardHome from "../components/dashboard/DashboardHome"
import DashboardBookings from "../components/dashboard/DashboardBookings"
import DashboardProfile from "../components/dashboard/DashboardProfile"
import DashboardPayments from "../components/dashboard/DashboardPayments"
import DashboardSettings from "../components/dashboard/DashboardSettings"

const Dashboard = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      {/* Dashboard Header */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
              <div className="flex items-center text-gray-300 text-sm">
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span>Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Dashboard Menu</h2>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className={`flex items-center p-3 rounded-md ${
                        path === "/dashboard"
                          ? "bg-orange-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <HomeIcon className="h-5 w-5 mr-3" />
                      Dashboard Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/bookings"
                      className={`flex items-center p-3 rounded-md ${
                        path === "/dashboard/bookings"
                          ? "bg-orange-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Calendar className="h-5 w-5 mr-3" />
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center p-3 rounded-md ${
                        path === "/dashboard/profile"
                          ? "bg-orange-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/payments"
                      className={`flex items-center p-3 rounded-md ${
                        path === "/dashboard/payments"
                          ? "bg-orange-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <CreditCard className="h-5 w-5 mr-3" />
                      Payment History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/settings"
                      className={`flex items-center p-3 rounded-md ${
                        path === "/dashboard/settings"
                          ? "bg-orange-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-orange-600 mr-3" />
                    <span>Active Bookings</span>
                  </div>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-3" />
                    <span>Pending Bookings</span>
                  </div>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-orange-600 mr-3" />
                    <span>Total Rentals</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/bookings" element={<DashboardBookings />} />
              <Route path="/profile" element={<DashboardProfile />} />
              <Route path="/payments" element={<DashboardPayments />} />
              <Route path="/settings" element={<DashboardSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
