
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden" data-aos="fade-in">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-1.jpg"
          alt="Luxury car in city"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <span className="inline-block text-orange-500 font-semibold uppercase tracking-wide mb-4">
            Welcome to NovaRide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Save More on Your Luxury Car Rental
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Whether you're planning a weekend getaway, a business trip, or need a reliable ride, NovaRide offers a wide
            range of premium vehicles to suit your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/RentalCars"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Book a rental car"
            >
              Book A Rental
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-orange-500 text-orange-500 font-semibold px-8 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              aria-label="Learn more about NovaRide"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="200">
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
