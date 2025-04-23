
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    <section className="py-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <span className="text-orange-500 font-semibold uppercase tracking-wide">Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? Our team is here to help. Reach out to us through any of the channels
            below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1" data-aos="fade-right">
            <div className="bg-white p-8 rounded-2xl shadow-2xl h-full">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-8">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 text-orange-500" aria-hidden="true" />,
                    title: "Our Location",
                    content: "123 Street Name, City, Country",
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-orange-500" aria-hidden="true" />,
                    title: "Phone Number",
                    content: "+1 234 567 8901",
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-orange-500" aria-hidden="true" />,
                    title: "Email Address",
                    content: "info@novaride.com",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                      <p className="text-gray-600 text-base">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2" data-aos="fade-left">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                    aria-required="true"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:shadow-md"
                    aria-required="true"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                  aria-label="Send contact message"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;