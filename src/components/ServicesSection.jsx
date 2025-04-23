
import { Car, Clock, CreditCard, MapPin, Shield, Users } from "lucide-react";



import { Link } from "react-router-dom";

const services = [
  {
    icon: <Car className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Car Rental",
    description: "Choose from our wide range of vehicles for your daily commute, business trip, or vacation.",
    to: "/services/rentals",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Chauffeur Drive",
    description: "Sit back and relax with our professional chauffeur service for business or leisure travel.",
    to: "/services/chauffeur",
  },
  {
    icon: <Clock className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Long Term Rental",
    description: "Benefit from our flexible long-term rental options with special rates and priority service.",
    to: "/services/long-term",
  },
  {
    icon: <MapPin className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Airport Transfer",
    description: "Start your journey smoothly with our reliable airport pickup and drop-off service.",
    to: "/services/airport-transfer",
  },
  {
    icon: <Shield className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Insurance Coverage",
    description: "Drive with peace of mind knowing you're protected by our comprehensive insurance options.",
    to: "/services/insurance",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-orange-500" aria-hidden="true" />,
    title: "Easy Payment",
    description: "Enjoy hassle-free booking and payment with our secure online payment system.",
    to: "/services/payment",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-100" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <span className="text-orange-500 font-semibold uppercase tracking-wide">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
            What We Offer
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We provide a comprehensive range of car rental services to meet all your transportation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">{service.description}</p>
              <Link
                to={service.to}
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 flex items-center"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
