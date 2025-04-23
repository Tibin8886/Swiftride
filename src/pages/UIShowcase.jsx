"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Car,
  CreditCard,
  User,
  Clock,
  Shield,
  ArrowRight,
  Lock,
  CheckCircle,
} from "lucide-react";

const UIShowcase = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { id: "home", title: "Home Page" },
    { id: "login", title: "Login Page" },
    { id: "signup", title: "Signup Page" },
    { id: "dashboard", title: "Dashboard" },
    { id: "bookings", title: "My Bookings" },
    { id: "car-listing", title: "Car Listing" },
    { id: "car-details", title: "Car Details" },
    { id: "checkout", title: "Checkout Process" },
  ];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const renderScreen = () => {
    switch (screens[currentScreen].id) {
      case "home":
        return <HomeScreen />;
      case "login":
        return <LoginScreen />;
      case "signup":
        return <SignupScreen />;
      case "dashboard":
        return <DashboardScreen />;
      case "bookings":
        return <BookingsScreen />;
      case "car-listing":
        return <CarListingScreen />;
      case "car-details":
        return <CarDetailsScreen />;
      case "checkout":
        return <CheckoutScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">NovaRide UI Showcase</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse through the different screens of the NovaRide website, designed for a seamless car rental experience.
          </p>
        </div>

        <div className="flex justify-center mb-8" role="tablist" data-aos="fade-up">
          <div className="inline-flex flex-wrap justify-center rounded-xl shadow-lg bg-white p-2 gap-2">
            {screens.map((screen, index) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(index)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  currentScreen === index
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                role="tab"
                aria-selected={currentScreen === index}
                aria-label={`View ${screen.title}`}
              >
                {screen.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" data-aos="zoom-in">
          <div className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-semibold">{screens[currentScreen].title}</div>
            <div></div>
          </div>

          <div className="p-6">{renderScreen()}</div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prevScreen}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Previous screen"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={nextScreen}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Next screen"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Screen Components
const HomeScreen = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden h-80 bg-gray-900" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        <div className="relative z-10 p-8 flex flex-col h-full justify-center">
          <span className="text-orange-500 font-semibold uppercase tracking-wide mb-2">Welcome to NovaRide</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Save More on Your Rental Car</h1>
          <p className="text-gray-200 text-base max-w-md leading-relaxed mb-6">
            Whether planning a getaway or business trip, explore our wide range of vehicles tailored to your needs.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Book a rental car"
            >
              Book A Rental
            </button>
            <button
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center shadow-lg hover:bg-gray-100 transition-all duration-300"
              aria-label="Learn more about NovaRide"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <h3 className="text-xl font-extrabold text-gray-900">Need to Rent a Car?</h3>
          </div>
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter Full Name"
                aria-label="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile No</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter Phone no."
                aria-label="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter Location"
                aria-label="Pickup location"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Date</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="mm/dd/yyyy"
                  aria-label="Pickup date"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
              <button
                className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Submit booking request"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
        {[
          { icon: <Shield className="h-10 w-10 text-orange-500" aria-hidden="true" />, title: "Safe & Secure" },
          { icon: <Clock className="h-10 w-10 text-orange-500" aria-hidden="true" />, title: "24/7 Support" },
          { icon: <MapPin className="h-10 w-10 text-orange-500" aria-hidden="true" />, title: "Convenient Locations" },
          { icon: <Car className="h-10 w-10 text-orange-500" aria-hidden="true" />, title: "Wide Range of Vehicles" },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-2xl text-center transform hover:scale-105 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-extrabold text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Experience top-notch service with our premium features tailored for your comfort.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoginScreen = () => {
  return (
    <div className="max-w-md mx-auto" data-aos="zoom-in">
      <div className="bg-orange-500 py-4 px-6 rounded-t-2xl">
        <h2 className="text-xl font-extrabold text-white">Login to Your Account</h2>
      </div>

      <div className="bg-white p-6 rounded-b-2xl shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                aria-label="Remember me"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
              aria-label="Forgot password"
            >
              Forgot password?
            </a>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Sign in"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                aria-label="Sign up"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignupScreen = () => {
  return (
    <div className="max-w-md mx-auto" data-aos="zoom-in">
      <div className="bg-orange-500 py-4 px-6 rounded-t-2xl">
        <h2 className="text-xl font-extrabold text-white">Create a NovaRide Account</h2>
      </div>

      <div className="bg-white p-6 rounded-b-2xl shadow-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Email address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Confirm password"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              aria-label="Agree to terms and conditions"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
                aria-label="Terms and conditions"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Create account"
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                aria-label="Sign in"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardScreen = () => {
  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Dashboard Header */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
            <p className="text-gray-300">Welcome back, John Doe</p>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-extrabold mr-3">
              J
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-300">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
        {[
          { icon: <Calendar className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Bookings", value: "4" },
          { icon: <Clock className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Active", value: "1" },
          { icon: <Car className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Completed", value: "2" },
          { icon: <CreditCard className="h-5 w-5 text-orange-500" aria-hidden="true" />, title: "Payments", value: "$840" },
        ].map((stat, index) => (
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

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-extrabold text-gray-900">Recent Bookings</h2>
          <a
            href="/bookings"
            className="text-orange-500 text-sm font-semibold flex items-center hover:text-orange-600 transition-colors duration-200"
            aria-label="View all bookings"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </a>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  id: "BK-2023-001",
                  car: "Tesla Model 3",
                  dates: "Apr 15 - Apr 18",
                  status: "Active",
                  amount: "$240.00",
                },
                { id: "BK-2023-002", car: "BMW X5", dates: "May 10 - May 12", status: "Completed", amount: "$320.00" },
                {
                  id: "BK-2023-003",
                  car: "Mercedes E-Class",
                  dates: "Jun 05 - Jun 07",
                  status: "Pending",
                  amount: "$280.00",
                },
              ].map((booking, index) => (
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
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BookingsScreen = () => {
  return (
    <div className="space-y-8" data-aos="fade-up">
      <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">My Bookings</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {["All Bookings", "Active", "Pending", "Completed"].map((tab, index) => (
            <button
              key={index}
              className={`pb-2 px-4 font-semibold text-sm ${
                index === 0
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label={`View ${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {[
            {
              id: "BK-2023-001",
              car: "Tesla Model 3",
              dates: "Apr 15 - Apr 18",
              location: "San Francisco Airport",
              status: "Active",
              amount: "$240.00",
            },
            {
              id: "BK-2023-002",
              car: "BMW X5",
              dates: "May 10 - May 12",
              location: "Los Angeles Downtown",
              status: "Completed",
              amount: "$320.00",
            },
          ].map((booking, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 flex items-center justify-center">
                  <div className="h-24 w-40 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Car Image
                  </div>
                </div>
                <div className="md:col-span-2 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-extrabold text-gray-900">{booking.car}</h3>
                      <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                    </div>
                    <span
                      className={`px-2 h-6 inline-flex items-center text-xs font-semibold rounded-full ${
                        booking.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
                      <span>{booking.dates}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
                      <span>Total: {booking.amount}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l flex flex-col justify-center items-center space-y-2">
                  <button
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    aria-label="View booking details"
                  >
                    View Details
                  </button>
                  {booking.status === "Active" ? (
                    <button
                      className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-all duration-200"
                      aria-label="Cancel booking"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-200"
                      aria-label="Book again"
                    >
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CarListingScreen = () => {
  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Car Type</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Car type"
            >
              <option>All Types</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Brand"
            >
              <option>All Brands</option>
              <option>Tesla</option>
              <option>BMW</option>
              <option>Mercedes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price Range</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Price range"
            >
              <option>Any Price</option>
              <option>$0 - $50</option>
              <option>$50 - $100</option>
              <option>$100+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Features</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              aria-label="Features"
            >
              <option>All Features</option>
              <option>GPS</option>
              <option>Bluetooth</option>
              <option>Sunroof</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Search cars"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
        {[
          { name: "Tesla Model 3", type: "Electric", price: "$60/day", image: "car-1.jpg" },
          { name: "BMW X5", type: "SUV", price: "$80/day", image: "car-2.jpg" },
          { name: "Mercedes E-Class", type: "Sedan", price: "$70/day", image: "car-3.jpg" },
          { name: "Audi Q7", type: "SUV", price: "$85/day", image: "car-4.jpg" },
          { name: "Toyota Camry", type: "Sedan", price: "$45/day", image: "car-5.jpg" },
          { name: "Range Rover Sport", type: "SUV", price: "$95/day", image: "car-6.jpg" },
        ].map((car, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">Car Image</div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-extrabold text-gray-900">{car.name}</h3>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{car.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-orange-500 font-extrabold">{car.price}</p>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all duration-300"
                  aria-label={`Book ${car.name}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarDetailsScreen = () => {
  return (
    <div className="space-y-8" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Car Images */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
            <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-4">
              Main Car Image
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((img, index) => (
                <div
                  key={index}
                  className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"
                >
                  Image {img}
                </div>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Tesla Model 3</h2>
            <div className="flex items-center mb-6">
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mr-3">Electric</span>
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mr-3">Automatic</span>
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">5 Seats</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              The Tesla Model 3 is an all-electric four-door sedan manufactured by Tesla. The Model 3 Standard Range Plus
              delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range versions deliver 353 miles
              (568 km).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-3">Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Make:</span>
                    <span>Tesla</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span>Model 3</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span>2023</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Doors:</span>
                    <span>4</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span>Automatic</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                    <span>GPS Navigation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                    <span>Bluetooth</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                    <span>USB Ports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                    <span>Heated Seats</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                    <span>Autopilot</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-2xl sticky top-4" data-aos="zoom-in">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">
              $60<span className="text-sm text-gray-500 font-normal">/day</span>
            </h3>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Location</label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    aria-label="Pickup location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Date</label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      aria-label="Pickup date"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Return Date</label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      aria-label="Return date"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Options</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="gps"
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        aria-label="GPS navigation"
                      />
                      <label htmlFor="gps" className="ml-2 block text-sm text-gray-700">
                        GPS Navigation
                      </label>
                    </div>
                    <span className="text-sm">$5/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="child-seat"
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                        aria-label="Child seat"
                      />
                      <label htmlFor="child-seat" className="ml-2 block text-sm text-gray-700">
                        Child Seat
                      </label>
                    </div>
                    <span className="text-sm">$10/day</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>3 days rental</span>
                  <span>$180.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Extra options</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes & fees</span>
                  <span>$18.00</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg">
                  <span>Total</span>
                  <span>$198.00</span>
                </div>
              </div>

              <button
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                aria-label="Book now"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutScreen = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
      <div className="md:col-span-2 space-y-6">
        {/* Booking Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Booking Summary</h2>

          <div className="flex items-start">
            <div className="h-24 w-40 bg-gray-200 rounded flex items-center justify-center text-gray-400 mr-4">
              Car Image
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900">Tesla Model 3</h3>
              <div className="flex items-center text-sm mt-2">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
                <span>Apr 15, 2023 - Apr 18, 2023 (3 days)</span>
              </div>
              <div className="flex items-center text-sm mt-1">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" aria-hidden="true" />
                <span>San Francisco Airport</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Customer Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value="John Doe"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value="john@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value="(123) 456-7890"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Driver's License</label>
              <input
                type="text"
                placeholder="Enter license number"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Driver's license number"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl" data-aos="zoom-in">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Payment Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
            <div className="relative">
              <CreditCard
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full pl-10 px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Card number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expiration Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="Expiration date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                aria-label="CVV"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="md:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-2xl sticky top-4" data-aos="zoom-in">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Car Rental (3 days)</span>
              <span>$180.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GPS Navigation</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance</span>
              <span>$30.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span>$22.50</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-extrabold text-lg mb-6">
              <span>Total</span>
              <span>$247.50</span>
            </div>

            <button
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Complete booking"
            >
              Complete Booking
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this booking, you agree to our{" "}
              <a
                href="/terms"
                className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
                aria-label="Terms of service"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
                aria-label="Privacy policy"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIShowcase;