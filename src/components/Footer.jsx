
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-extrabold">
                <span className="text-orange-500">SWIFT</span>
                <span className="text-white">RIDE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              We offer a wide range of vehicles for all your driving needs. We have the perfect car to meet your needs.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, name: "Facebook", url: "https://facebook.com" },
                { icon: <Twitter className="h-5 w-5" />, name: "Twitter", url: "https://twitter.com" },
                { icon: <Instagram className="h-5 w-5" />, name: "Instagram", url: "https://instagram.com" },
                { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn", url: "https://linkedin.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/", label: "Our Cars" },
                { to: "/contact", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-base"
                    aria-label={`Navigate to ${link.label} page`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-semibold text-white mb-6">Working Hours</h3>
            <ul className="space-y-3 text-gray-400 text-base">
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 7:00PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400 text-base">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>123 Street Name, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+12345678901"
                  className="hover:text-orange-500 transition-colors duration-300"
                  aria-label="Call us at +1 234 567 8901"
                >
                  +1 234 567 8901
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@novaride.com"
                  className="hover:text-orange-500 transition-colors duration-300"
                  aria-label="Email us at info@novaride.com"
                >
                  info@novaride.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-500 text-base" data-aos="fade-up" data-aos-delay="500">
          <p>© {new Date().getFullYear()} NovaRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
