import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

const DashboardProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    driverLicense: "",
    licenseExpiry: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const inputStyle = (editable = true) =>
    `w-full pl-10 px-4 py-2 border rounded-md transition-all duration-200 ease-in-out ${
      editable
        ? "bg-white border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        : "bg-gray-100 border-gray-200 cursor-not-allowed"
    }`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle(isEditing)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle(isEditing)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle(isEditing)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle(isEditing)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["city", "state", "zipCode", "country"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block mb-1 text-sm font-medium capitalize text-gray-700">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle(isEditing).replace("pl-10", "pl-4")}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="driverLicense" className="block mb-1 text-sm font-medium text-gray-700">
                Driver's License Number
              </label>
              <input
                type="text"
                id="driverLicense"
                name="driverLicense"
                value={user.driverLicense}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle(isEditing).replace("pl-10", "pl-4")}
              />
            </div>

            <div>
              <label htmlFor="licenseExpiry" className="block mb-1 text-sm font-medium text-gray-700">
                License Expiry Date
              </label>
              <input
                type="date"
                id="licenseExpiry"
                name="licenseExpiry"
                value={user.licenseExpiry}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle(isEditing).replace("pl-10", "pl-4")}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="flex items-center px-5 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;