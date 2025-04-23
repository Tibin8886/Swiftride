import { useState, useEffect } from "react";
import { Lock, Bell, Shield, Save } from "lucide-react";

const DashboardSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailBooking: true,
    emailPromotions: false,
    smsBooking: true,
    smsPromotions: false,
  });

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => {
      const updated = { ...prev, [name]: checked };
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.confirmPassword) {
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      alert("New password and confirm password do not match!");
    }
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("notifications", JSON.stringify(notifications));
    alert("Notification preferences updated successfully!");
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center mb-6">
      <Icon className="h-6 w-6 text-orange-600 mr-3" />
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow p-6">
        <SectionHeader icon={Lock} title="Change Password" />

        <div className="space-y-5">
          {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="password"
                id={field}
                name={field}
                value={passwordData[field]}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          ))}

          <button
            onClick={handlePasswordSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <SectionHeader icon={Bell} title="Notification Preferences" />

        <div className="space-y-5">
          {[
            {
              name: "emailBooking",
              title: "Booking Confirmations",
              desc: "Receive booking confirmations and updates via email",
            },
            {
              name: "emailPromotions",
              title: "Promotional Emails",
              desc: "Receive special offers and promotions via email",
            },
            {
              name: "smsBooking",
              title: "SMS Booking Alerts",
              desc: "Receive booking confirmations and updates via SMS",
            },
            {
              name: "smsPromotions",
              title: "SMS Promotions",
              desc: "Receive special offers and promotions via SMS",
            },
          ].map(({ name, title, desc }) => (
            <div
              key={name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={name}
                  checked={notifications[name]}
                  onChange={handleNotificationChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:bg-orange-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          ))}

          <button
            onClick={handleNotificationsSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <SectionHeader icon={Shield} title="Account Security" />

        <div className="space-y-4">
          {[
            {
              title: "Two-Factor Authentication",
              desc: "Add an extra layer of security to your account",
              action: "Enable",
              type: "primary",
            },
            {
              title: "Login History",
              desc: "View your recent login activity",
              action: "View",
              type: "outline",
            },
            {
              title: "Delete Account",
              desc: "Permanently delete your account and all data",
              action: "Delete",
              type: "danger",
            },
          ].map(({ title, desc, action, type }) => (
            <div key={title} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition">
              <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  type === "primary"
                    ? "text-white bg-orange-600 hover:bg-orange-700"
                    : type === "outline"
                    ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "text-white bg-red-600 hover:bg-red-700"
                }`}
              >
                {action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;