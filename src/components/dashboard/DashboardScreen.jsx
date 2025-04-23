import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Car,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const DashboardScreen = () => {
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      const defaultBookings = [
        {
          id: "BK-2023-001",
          car: "Tesla Model 3",
          dates: "Apr 15 - Apr 18",
          status: "Active",
          amount: "$240.00",
        },
        {
          id: "BK-2023-002",
          car: "BMW X5",
          dates: "May 10 - May 12",
          status: "Completed",
          amount: "$320.00",
        },
        {
          id: "BK-2023-003",
          car: "Mercedes E-Class",
          dates: "Jun 05 - Jun 07",
          status: "Pending",
          amount: "$280.00",
        },
      ];
      setBookings(defaultBookings);
      localStorage.setItem("bookings", JSON.stringify(defaultBookings));
    }
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  const cancelBooking = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId && booking.status === "Active"
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  const stats = [
    { icon: <Calendar className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Bookings", value: bookings.length.toString() },
    { icon: <Clock className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Active", value: bookings.filter(b => b.status === "Active").length.toString() },
    { icon: <Car className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Completed", value: bookings.filter(b => b.status === "Completed").length.toString() },
    {
      icon: <CreditCard className="h-5 w-5 text-orange-500" aria-hidden="true" />,
      title: "Payments",
      value: `$${bookings.reduce((sum, b) => sum + parseFloat(b.amount.replace("$", "")), 0).toFixed(2)}`,
    },
  ];

  return (
    <div className="space-y-8" data-aos="fade-up">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
            <p className="text-gray-300">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-extrabold mr-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center mb-2">
              {stat.icon}
              <h3 className="font-extrabold text-gray-900 ml-2">{stat.title}</h3>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-extrabold text-gray-900">Recent Bookings</h2>
          <button
            onClick={() => window.location.href = "/bookings"}
            className="text-orange-500 text-sm font-semibold flex items-center hover:text-orange-600 transition-colors duration-200"
            aria-label="View all bookings"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Car</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.car}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.dates}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {booking.status === "Active" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-500 hover:text-red-600 font-semibold"
                        aria-label={`Cancel booking ${booking.id}`}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;