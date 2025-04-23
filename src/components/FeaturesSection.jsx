
import { Shield, Clock, MapPin, Car } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Safe & Secure",
    description: "We prioritize your safety with well-maintained vehicles and comprehensive insurance coverage.",
  },
  {
    icon: <Clock className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist you with any questions or concerns.",
  },
  {
    icon: <MapPin className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Convenient Locations",
    description: "Pick up and drop off your rental car at any of our convenient locations across the city.",
  },
  {
    icon: <Car className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Wide Range of Vehicles",
    description: "Choose from our extensive fleet of vehicles, from economy cars to luxury SUVs and everything in between.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-100" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <span className="text-orange-500 font-semibold uppercase tracking-wide">Our Features</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We offer a premium car rental experience with a wide selection of vehicles and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-2xl text-center transform hover:scale-105 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
