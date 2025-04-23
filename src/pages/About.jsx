
import { ArrowRight, Check, Users, Car, Award } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "With over 15 years in the car rental industry, John leads NovaRide with passion and expertise.",
  },
  {
    name: "Emma Wilson",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Emma ensures our fleet and services run smoothly, delivering top-notch customer experiences.",
  },
  {
    name: "Michael Chen",
    role: "Customer Service Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Michael is dedicated to providing 24/7 support, ensuring customer satisfaction at every step.",
  },
  {
    name: "Sarah Davis",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Sarah drives our brand’s vision, connecting with customers through innovative campaigns.",
  },
];

const About = () => {
  return (
    <>
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-20" data-aos="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About NovaRide</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our commitment to delivering exceptional car rental services with a focus on quality and customer satisfaction.
          </p>
        </div>
      </div>

      {/* About Content */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div data-aos="fade-right" data-aos-delay="100">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury car parked in modern setting"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div data-aos="fade-left" data-aos-delay="200">
              <span className="text-orange-500 font-semibold uppercase tracking-wide">Our Story</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight">
                Quality Car Rentals Since 2010
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 2010, NovaRide began with a mission to redefine car rental services through quality, transparency, and customer care. From a modest fleet of five vehicles, we’ve grown into a trusted name in the industry.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our dedication to excellence drives everything we do, from maintaining a premium fleet to offering competitive pricing and unparalleled support.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Extensive fleet of well-maintained vehicles",
                  "Transparent pricing with no hidden fees",
                  "24/7 customer support for peace of mind",
                  "Convenient pickup and drop-off locations",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3 mt-1">
                      <Check className="h-5 w-5 text-orange-500" aria-hidden="true" />
                    </div>
                    <p className="text-gray-600 text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Car className="h-8 w-8 text-orange-500" />, value: "500+", label: "Vehicles in Fleet" },
              { icon: <Users className="h-8 w-8 text-orange-500" />, value: "10,000+", label: "Satisfied Customers" },
              { icon: <Award className="h-8 w-8 text-orange-500" />, value: "15+", label: "Industry Awards" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-down">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">Our Team</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Our dedicated professionals are committed to delivering the best car rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-base">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Experience NovaRide?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Book your car rental today and join thousands of satisfied customers who trust NovaRide.
          </p>
          <Link
            to="/booking"
            className="inline-flex bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Book a rental car"
          >
            Book A Rental <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
