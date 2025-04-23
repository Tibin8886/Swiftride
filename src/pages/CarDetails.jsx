import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Check, Car, Users, Gauge, Briefcase, Wind, Clock } from "lucide-react";

const CarDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const car = state?.car || {
    id: 1,
    name: "Mercedes-Benz S-Class",
    image: "https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/Eclipse-Sedan.png",
    price: 120,
    features: { passengers: 4, fuel: "Petrol", speed: "250 km/h" },
  };

  const [selectedTab, setSelectedTab] = useState("description");
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: "",
    returnDate: "",
    gps: false,
    childSeat: false,
    additionalDriver: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateTotal = () => {
    const days = 3; // Fixed 3-day rental for simplicity
    const baseRate = car.price * days;
    const extras = (formData.gps ? 15 : 0) + (formData.childSeat ? 30 : 0) + (formData.additionalDriver ? 45 : 0);
    const taxes = (baseRate + extras) * 0.1;
    return (baseRate + extras + taxes).toFixed(2);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!formData.pickupLocation || !formData.pickupDate || !formData.returnDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookingData = {
      id: Date.now(),
      car: car.name,
      carId: car.id,
      pricePerDay: car.price,
      pickupLocation: formData.pickupLocation,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      extras: {
        gps: formData.gps,
        childSeat: formData.childSeat,
        additionalDriver: formData.additionalDriver,
      },
      total: calculateTotal(),
      status: "pending",
      bookingDate: new Date().toISOString(),
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover opacity-20 transform scale-105 transition-transform duration-1000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md animate-fade-in">
            {car.name}
          </h1>
          <div className="flex items-center justify-center text-sm font-medium space-x-2">
            <Link to="/" className="hover:text-orange-200 transition-colors duration-300">
              Home
            </Link>
            <span className="text-orange-200">/</span>
            <Link to="/RentalCars" className="hover:text-orange-200 transition-colors duration-300">
              Cars
            </Link>
            <span className="text-orange-200">/</span>
            <span className="text-orange-100">{car.name}</span>
          </div>
        </div>
      </div>

      {/* Car Details Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Car Info and Images */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <span className="text-gray-500 text-sm font-medium">Starting from</span>
                    <h2 className="text-4xl font-extrabold text-orange-600">
                      ${car.price} <span className="text-sm text-gray-500 font-normal">/Per Day</span>
                    </h2>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <button
                      onClick={handleBookNow}
                      className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full flex items-center hover:bg-orange-700 transition-colors duration-300"
                    >
                      Book This Car <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { icon: Car, label: "Doors", value: "4" },
                    { icon: Users, label: "Passengers", value: car.features.passengers },
                    { icon: Gauge, label: "Transmission", value: "Auto" },
                    { icon: Clock, label: "Age", value: "4" },
                    { icon: Briefcase, label: "Luggage", value: "2" },
                    { icon: Wind, label: "Air Condition", value: "Yes" },
                  ].map((spec, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="bg-orange-100 p-3 rounded-full mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                        <spec.icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">{spec.label}</span>
                        <p className="font-semibold text-gray-800">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex border-b border-gray-200">
                  {["description", "features", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 px-6 py-4 font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                        selectedTab === tab
                          ? "text-orange-600 border-b-4 border-orange-600 bg-orange-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="p-8 animate-fade-in">
                  {selectedTab === "description" && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">About {car.name}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        The {car.name} is a premium vehicle that combines elegant design with powerful performance. Perfect for both city drives and long road trips.
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Equipped with a high-performance engine, it delivers impressive acceleration and responsive handling. Enjoy a comfortable and engaging driving experience.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Inside, you'll find premium materials, advanced technology features, and ample space for passengers. The intuitive controls ensure a seamless journey.
                      </p>
                    </div>
                  )}
                  {selectedTab === "features" && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Car Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Leather Seats",
                          "Navigation System",
                          "Bluetooth Connectivity",
                          "Premium Sound System",
                          "Heated Seats",
                          "Parking Sensors",
                          "Keyless Entry",
                          "Cruise Control",
                          "Alloy Wheels",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center group">
                            <div className="bg-green-100 p-2 rounded-full mr-3 group-hover:bg-green-200 transition-colors duration-300">
                              <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTab === "reviews" && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
                      <div className="space-y-8">
                        {[
                          {
                            name: "John Smith",
                            initial: "J",
                            rating: 5,
                            text: "Amazing car! Perfect for our road trip. Highly recommend!",
                          },
                          {
                            name: "Sarah Johnson",
                            initial: "S",
                            rating: 4,
                            text: "Great handling and comfort. Would rent again!",
                          },
                          {
                            name: "Michael Brown",
                            initial: "M",
                            rating: 5,
                            text: "Exceptional performance. The car was spotless and staff was helpful.",
                          },
                        ].map((review, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <div className="flex items-center mb-3">
                              <div className="bg-orange-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                {review.initial}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                                <div className="flex text-yellow-400">
                                  {Array(5)
                                    .fill()
                                    .map((_, i) => (
                                      <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                                        ★
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Book This Car</h3>
                <form onSubmit={handleBookNow} className="space-y-6">
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        placeholder="Enter pickup location"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Options</label>
                    <div className="space-y-3">
                      {[
                        { id: "gps", label: "GPS Navigation", price: "$5/day" },
                        { id: "childSeat", label: "Child Seat", price: "$10/day" },
                        { id: "additionalDriver", label: "Additional Driver", price: "$15/day" },
                      ].map((option) => (
                        <div key={option.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={option.id}
                              name={option.id}
                              checked={formData[option.id]}
                              onChange={handleInputChange}
                              className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={option.id} className="ml-3 block text-sm text-gray-700">
                              {option.label}
                            </label>
                          </div>
                          <span className="text-sm text-gray-500">{option.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between mb-3 text-sm">
                      <span className="text-gray-600">Base Rate (3 days)</span>
                      <span className="font-medium">${(car.price * 3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-sm">
                      <span className="text-gray-600">Extra Options</span>
                      <span className="font-medium">
                        ${(formData.gps ? 15 : 0) + (formData.childSeat ? 30 : 0) + (formData.additionalDriver ? 45 : 0)}.00
                      </span>
                    </div>
                    <div className="flex justify-between mb-3 text-sm">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">${((car.price * 3 + (formData.gps ? 15 : 0) + (formData.childSeat ? 30 : 0) + (formData.additionalDriver ? 45 : 0)) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cars Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Similar Options</span>
            <h2 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4">Related Cars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore other vehicles in our fleet that might interest you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JSON.parse(localStorage.getItem("cars") || "[]")
              .filter((c) => c.id !== car.id)
              .slice(0, 3)
              .map((relatedCar, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="h-56 bg-gray-200 relative">
                    <img
                      src={relatedCar.image}
                      alt={relatedCar.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => (e.target.src = "/src/assets/car-placeholder.jpg")}
                    />
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      ${relatedCar.price}/day
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{relatedCar.name}</h3>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                        {relatedCar.features.fuel}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{relatedCar.features.passengers} Seats</span>
                      </div>
                      <div className="flex items-center">
                        <Gauge className="h-5 w-5 mr-2 text-orange-600" />
                        <span>Auto</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-orange-600" />
                        <span>2 Luggage</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="h-5 w-5 mr-2 text-orange-600" />
                        <span>A/C</span>
                      </div>
                    </div>
                    <Link
                      to={`/CarDetails/${relatedCar.id}`}
                      state={{ car: relatedCar }}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 inline-flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CarDetails;