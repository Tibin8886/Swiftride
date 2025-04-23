
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative" data-aos="fade-right">
            <img
              src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-1.jpg"
              alt="Luxury car"
              className="rounded-xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-xl shadow-lg md:block animate-pulse">
              <div className="text-4xl font-extrabold">10+</div>
              <div className="text-sm font-medium">Years of Experience</div>
            </div>
          </div>

          {/* Content */}
          <div data-aos="fade-left">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">About Us</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight">
              The Best Car Rental Service in Your City
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              NovaRide is a premier car rental service dedicated to providing exceptional vehicles and outstanding
              customer service. With over 10 years of experience in the industry, we've built a reputation for
              reliability, quality, and convenience.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  title: "Quality Vehicles",
                  description:
                    "Our fleet consists of well-maintained, late-model vehicles to ensure your safety and comfort.",
                },
                {
                  title: "Competitive Pricing",
                  description:
                    "We offer transparent pricing with no hidden fees, ensuring you get the best value for your money.",
                },
                {
                  title: "Flexible Rental Options",
                  description:
                    "From hourly rentals to long-term leases, we have options to suit your specific needs.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                    <Check className="h-5 w-5 text-orange-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-base">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-block bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Learn more about NovaRide"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
