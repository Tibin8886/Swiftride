
import { Calendar } from "lucide-react";
import { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <section className="py-12 bg-gray-100" data-aos="fade-up">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
                Need to Rent a Luxury Car?
              </h3>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Mobile No
                </label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter Phone no."
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Pickup Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                  aria-required="true"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Pickup Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md appearance-none"
                    aria-required="true"
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                  aria-label="Submit booking form"
                >
                  Book Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;