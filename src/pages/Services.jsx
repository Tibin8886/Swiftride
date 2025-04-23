import { ArrowRight, Car, Users, Clock, MapPin, Shield, CreditCard, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Car className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Car Rental",
    description:
      "Choose from our wide range of vehicles for your daily commute, business trip, or vacation. We offer everything from compact cars to luxury sedans and SUVs to meet your needs.",
    link: "/booking",
  },
  {
    icon: <Users className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Chauffeur Drive",
    description:
      "Sit back and relax with our professional chauffeur service for business or leisure travel. Our experienced drivers ensure a comfortable and safe journey.",
    link: "/booking",
  },
  {
    icon: <Clock className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Long Term Rental",
    description:
      "Benefit from our flexible long-term rental options with special rates and priority service. Perfect for extended business trips or relocations.",
    link: "/booking",
  },
  {
    icon: <MapPin className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Airport Transfer",
    description:
      "Start your journey smoothly with our reliable airport pickup and drop-off service. We monitor flight arrivals to ensure we're there when you need us.",
    link: "/booking",
  },
  {
    icon: <Shield className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Insurance Coverage",
    description:
      "Drive with peace of mind knowing you're protected by our comprehensive insurance options, tailored to suit your needs and budget.",
    link: "/contact",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-orange-500" aria-hidden="true" />,
    title: "Easy Payment",
    description:
      "Enjoy hassle-free booking and payment with our secure online system, accepting all major credit cards and multiple payment options.",
    link: "/booking",
  },
];

const pricingPlans = [
  {
    name: "Economy",
    price: 49,
    features: [
      { name: "Compact or Economy Car", included: true },
      { name: "Third Party Insurance", included: true },
      { name: "100 Miles Per Day", included: true },
      { name: "GPS Navigation", included: false },
      { name: "Child Seat", included: false },
    ],
  },
  {
    name: "Standard",
    price: 79,
    popular: true,
    features: [
      { name: "Mid-size Car or SUV", included: true },
      { name: "Comprehensive Insurance", included: true },
      { name: "Unlimited Mileage", included: true },
      { name: "GPS Navigation", included: true },
      { name: "Premium Roadside Assistance", included: false },
    ],
  },
  {
    name: "Premium",
    price: 129,
    features: [
      { name: "Luxury Car or Premium SUV", included: true },
      { name: "Full Coverage Insurance", included: true },
      { name: "Unlimited Mileage", included: true },
      { name: "GPS Navigation", included: true },
      { name: "Premium Roadside Assistance", included: true },
    ],
  },
];

const Services = () => {
  return (
    <>
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-20" data-aos="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of car rental services tailored to meet all your transportation needs.
          </p>
        </div>
      </div>

      {/* Services List */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-6 transform hover:scale-105 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    to={service.link}
                    className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center transition-colors duration-200"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-down">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">Process</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Renting a car with NovaRide is quick and easy. Follow these simple steps to get on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: 1,
                title: "Choose Your Vehicle",
                description: "Browse our fleet and select the vehicle that best suits your needs and preferences.",
              },
              {
                step: 2,
                title: "Book Your Rental",
                description: "Complete the booking form with your details and preferred pickup date and location.",
              },
              {
                step: 3,
                title: "Enjoy Your Ride",
                description: "Pick up your vehicle at the designated location and enjoy your journey with peace of mind.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-2xl text-center relative"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="absolute -top-4 -left-4 bg-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl font-extrabold">
                  {step.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-base">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-orange-500" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-down">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
              Our Rental Packages
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              We offer competitive rates and flexible rental packages to suit your budget and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-2xl border ${
                  plan.popular ? "border-orange-500 border-2" : "border-gray-200"
                } relative transform hover:scale-105 transition-all duration-300`}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-extrabold rounded-bl-lg">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-extrabold text-gray-900 mb-6">
                  ${plan.price}
                  <span className="text-sm text-gray-600 font-normal">/day</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div
                        className={`p-1 rounded-full mr-3 ${
                          feature.included ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="h-3 w-3 text-green-500" aria-hidden="true" />
                        ) : (
                          <X className="h-3 w-3 text-gray-400" aria-hidden="true" />
                        )}
                      </div>
                      <span className={feature.included ? "text-gray-600" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className="block w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 text-center"
                  aria-label={`Book ${plan.name} package`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Contact our team to discuss custom rental packages tailored to your specific requirements for businesses,
            events, or special occasions.
          </p>
          <Link
            to="/contact"
            className="inline-flex bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Contact us for custom rental solutions"
          >
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;