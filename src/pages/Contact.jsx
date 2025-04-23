import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Placeholder for API call (replace with your backend or EmailJS)
      // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) });
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-20" data-aos="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Contact SwiftRide</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? Our team is here to help you with your car rental needs.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Phone className="h-8 w-8 text-orange-500" aria-hidden="true" />,
                title: "Phone",
                details: ["+1 234 567 8901", "+1 234 567 8902"],
              },
              {
                icon: <Mail className="h-8 w-8 text-orange-500" aria-hidden="true" />,
                title: "Email",
                details: ["info@novaride.com", "support@novaride.com"],
              },
              {
                icon: <MapPin className="h-8 w-8 text-orange-500" aria-hidden="true" />,
                title: "Location",
                details: ["123 Street Name", "City, Country"],
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-500" aria-hidden="true" />,
                title: "Working Hours",
                details: ["Mon - Fri: 9:00AM - 9:00PM", "Sat: 9:00AM - 7:00PM"],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                {card.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-base">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2" data-aos="fade-right">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      aria-required="true"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600 hover:scale-105"
                    }`}
                    aria-label="Send message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  {submitStatus === "success" && (
                    <p className="mt-4 text-green-600 text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="mt-4 text-red-600 text-center">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-1" data-aos="fade-left">
              <div className="bg-white p-8 rounded-2xl shadow-2xl h-full">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Location</h2>
                <div className="relative h-64 rounded-lg mb-4 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019238955466!2d-122.4194156846812!3d37.77492977975928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5e6b6e7d%3A0x4e6f1e2b0b8e1f7b!2s123%20Market%20St%2C%20San%20Francisco%2C%20CA%2094102%2C%20USA!5e0!3m2!1sen!2sus!4v1635789274657!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="NovaRide Location"
                  ></iframe>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Head Office</h4>
                      <p className="text-gray-600">123 Street Name, City, Country</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Branch Office</h4>
                      <p className="text-gray-600">456 Avenue Name, City, Country</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;