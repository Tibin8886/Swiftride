
import { Link } from "react-router-dom";
import { Car, Fuel, Gauge, Users } from "lucide-react";

const cars = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    image: "https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/Voyager-GT.png",
    price: 120,
    features: { passengers: 4, fuel: "Petrol", speed: "250 km/h" },
  },
  {
    id: 2,
    name: "BMW X5 SUV",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 90,
    features: { passengers: 5, fuel: "Diesel", speed: "220 km/h" },
  },
  {
    id: 3,
    name: "Tesla Model 3",
    image: "https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/Sapphire-Convertible.png",
    price: 80,
    features: { passengers: 5, fuel: "Electric", speed: "225 km/h" },
  },
  {
    id: 4,
    name: "Audi A4 Sedan",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 70,
    features: { passengers: 4, fuel: "Petrol", speed: "200 km/h" },
  },
];

const RentalCarsSection = () => {
  return (
    <section className="py-16 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <span className="text-orange-500 font-semibold uppercase tracking-wide">Our Fleet</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
            Explore Our Rental Cars
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our premium selection of vehicles, from luxury sedans to eco-friendly electric cars, tailored to your driving needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="bg-gray-50 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={car.image}
                alt={`${car.name} rental car`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
              <p className="text-orange-500 font-bold text-lg mb-4">${car.price}/day</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                  {car.features.passengers} Passengers
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Fuel className="h-5 w-5 mr-2" aria-hidden="true" />
                  {car.features.fuel}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Gauge className="h-5 w-5 mr-2" aria-hidden="true" />
                  {car.features.speed}
                </div>
              </div>
              <Link
                to={`/booking?car=${car.id}`}
                className="block bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 text-center"
                aria-label={`Book ${car.name} now`}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentalCarsSection;
