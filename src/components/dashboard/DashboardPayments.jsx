import { useState, useEffect } from "react";
import { CreditCard, Download, Filter } from "lucide-react";

const DashboardPayments = () => {
  const [filter, setFilter] = useState("all");
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const storedPayments = localStorage.getItem("payments");
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    } else {
      const defaultPayments = [
        { id: "PAY-2023-001", bookingId: "BK-2023-001", date: "2023-04-15", amount: "$240.00", method: "Credit Card", status: "Completed" },
        { id: "PAY-2023-002", bookingId: "BK-2023-002", date: "2023-05-10", amount: "$320.00", method: "PayPal", status: "Completed" },
        { id: "PAY-2023-003", bookingId: "BK-2023-003", date: "2023-06-05", amount: "$280.00", method: "Credit Card", status: "Pending" },
        { id: "PAY-2023-004", bookingId: "BK-2023-004", date: "2023-03-20", amount: "$450.00", method: "Debit Card", status: "Completed" },
      ];
      setPayments(defaultPayments);
      localStorage.setItem("payments", JSON.stringify(defaultPayments));
    }

    const storedMethods = localStorage.getItem("paymentMethods");
    if (storedMethods) {
      setPaymentMethods(JSON.parse(storedMethods));
    } else {
      const defaultMethods = [
        { id: "PM-001", type: "Visa", lastFour: "4242", expiry: "12/2025", isDefault: true },
        { id: "PM-002", type: "Mastercard", lastFour: "5555", expiry: "08/2024", isDefault: false },
      ];
      setPaymentMethods(defaultMethods);
      localStorage.setItem("paymentMethods", JSON.stringify(defaultMethods));
    }
  }, []);

  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem("payments", JSON.stringify(payments));
    }
    if (paymentMethods.length > 0) {
      localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
    }
  }, [payments, paymentMethods]);

  const filteredPayments = filter === "all" ? payments : payments.filter((p) => p.status.toLowerCase() === filter);

  const addPaymentMethod = () => {
    const newMethod = {
      id: `PM-${Date.now()}`,
      type: "New Card",
      lastFour: "XXXX",
      expiry: "MM/YYYY",
      isDefault: false,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const setDefaultMethod = (methodId) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    );
  };

  return (
    <div className="space-y-8 p-6">
      <section className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Payment History</h2>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-xs text-gray-500 uppercase">
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="bg-gray-50 hover:bg-gray-100 transition rounded-md shadow-sm">
                  <td className="px-4 py-2">{payment.id}</td>
                  <td className="px-4 py-2 text-gray-600">{payment.bookingId}</td>
                  <td className="px-4 py-2 text-gray-600">{payment.date}</td>
                  <td className="px-4 py-2 text-gray-700 font-medium">{payment.amount}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    {payment.method}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-orange-600 hover:underline flex items-center gap-1 text-sm">
                      <Download className="h-4 w-4" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex justify-between items-center border rounded-md p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-md ${method.type === "Visa" ? "bg-blue-100" : "bg-indigo-100"}`}>
                  <CreditCard className={`h-5 w-5 ${method.type === "Visa" ? "text-blue-600" : "text-indigo-600"}`} />
                </div>
                <div>
                  <p className="font-medium">{method.type} ending in {method.lastFour}</p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {method.isDefault ? (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Default</span>
                ) : (
                  <button
                    onClick={() => setDefaultMethod(method.id)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
                <button className="text-sm text-gray-500 hover:underline">Edit</button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPaymentMethod}
          className="mt-6 flex items-center text-orange-600 hover:text-orange-700 font-medium"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Add Payment Method
        </button>
      </section>
    </div>
  );
};

export default DashboardPayments;