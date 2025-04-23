import { useState, useEffect } from "react";
import { Calendar, Clock, Car, CreditCard, ArrowRight } from "lucide-react";

const DashboardHome = () => {
  const [user, setUser] = useState({ name: "John Doe" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user data
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    // Fetch bookings
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        // Validate bookings data
        const validBookings = parsedBookings.filter(
          (b) => b && b.id && b.car && b.dates && b.status && typeof b.amount === "string"
        );
        setBookings(validBookings);
      } catch (error) {
        console.error("Error parsing bookings from localStorage:", error);
      }
    } else {
      // Initialize with default bookings if none exist
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

  // Calculate stats with error handling
  const stats = [
    {
      icon: <Calendar className="text-orange-600" />,
      label: "Bookings",
      value: bookings.length,
      to: "/dashboard/bookings",
    },
    {
      icon: <Clock className="text-orange-600" />,
      label: "Active",
      value: bookings.filter((b) => b.status === "Active").length,
      to: "/dashboard/bookings",
    },
    {
      icon: <Car className="text-orange-600" />,
      label: "Completed",
      value: bookings.filter((b) => b.status === "Completed").length,
      to: "/dashboard/bookings",
    },
    {
      icon: <CreditCard className="text-orange-600" />,
      label: "Payments",
      value: `$${bookings
        .reduce((sum, b) => {
          if (b.amount && typeof b.amount === "string") {
            const amount = parseFloat(b.amount.replace("$", ""));
            return isNaN(amount) ? sum : sum + amount;
          }
          return sum;
        }, 0)
        .toFixed(2)}`,
      to: "/dashboard/payments",
    },
  ];

  return (
    <div className="space-y-8 px-4 md:px-8 py-6 bg-gradient-to-tr from-gray-50 to-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back, {user.name}!</h2>
        <p className="text-gray-600 text-base mb-6">
          Manage your car rentals, view booking history, and update your profile — all in one dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h3 className="font-semibold">{item.label}</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              <button
                onClick={() => window.location.href = item.to}
                className="text-orange-600 text-sm flex items-center mt-2 hover:underline"
              >
                View <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
          <button
            onClick={() => window.location.href = "/dashboard/bookings"}
            className="text-orange-600 text-sm hover:underline flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3">Car</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {bookings.slice(0, 3).map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.car}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.dates}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = "/"}
            className="bg-orange-600 text-white py-4 rounded-xl text-center font-medium hover:bg-orange-700 transition duration-300"
          >
            Book a New Car
          </button>
          <button
            onClick={() => window.location.href = "/dashboard/profile"}
            className="bg-gray-800 text-white py-4 rounded-xl text-center font-medium hover:bg-gray-900 transition duration-300"
          >
            Update Profile
          </button>
          <button
            onClick={() => window.location.href = "/contact"}
            className="bg-gray-200 text-gray-800 py-4 rounded-xl text-center font-medium hover:bg-gray-300 transition duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;