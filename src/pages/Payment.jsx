import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle,
  Lock,
  Calendar,
  Wallet,
  DollarSign as PaypalLogo,
  Bitcoin,
  EclipseIcon as Ethereum,
  DollarSign,
  Shield,
  ArrowRight,
  Copy,
  QrCode,
  RefreshCw,
} from "lucide-react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load latest booking
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (bookings.length > 0) {
      setBooking(bookings[bookings.length - 1]);
    }
  }, []);

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!booking) {
      setError("No booking found.");
      return;
    }

    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError("Please fill in all card details.");
        return;
      }
      if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber)) {
        setError("Invalid card number.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        setError("Invalid expiry date.");
        return;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Invalid CVV.");
        return;
      }
    }

    setIsProcessing(true);
    setError(null);

    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Update booking
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const updatedBookings = bookings.map((b) =>
        b.id === booking.id ? { ...b, status: "confirmed", paymentMethod, paymentDate: new Date().toISOString() } : b
      );
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      // Save card
      if (saveCard && paymentMethod === "credit-card") {
        const savedCards = JSON.parse(localStorage.getItem("savedCards") || "[]");
        savedCards.push({ cardName, lastFour: cardNumber.slice(-4), expiryDate });
        localStorage.setItem("savedCards", JSON.stringify(savedCards));
      }

      setTimeout(() => navigate("/payment-confirmation"), 2000);
    }, 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isSuccess ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully. Redirecting to confirmation...
            </p>
            <div className="animate-pulse flex justify-center space-x-2">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-6 px-8">
                  <h1 className="text-3xl font-bold text-white">Complete Your Payment</h1>
                </div>
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Payment Method</h2>
                    <a href="/CryptoWallet"><button className="text-xl font-semibold text-gray-900 mb-4 bg-red-200 p-3">Click here Payment Method Crypto</button></a>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "credit-card", icon: CreditCard, label: "Credit Card" },
                        { id: "paypal", icon: PaypalLogo, label: "PayPal" },
                        { id: "crypto", icon: Wallet, label: "Crypto" },
                      ].map((method) => (
                        <button
                          key={method.id}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            paymentMethod === method.id
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <method.icon
                            className={`h-10 w-10 mb-2 ${
                              paymentMethod === method.id ? "text-indigo-600" : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              paymentMethod === method.id ? "text-indigo-600" : "text-gray-600"
                            }`}
                          >
                            {method.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                  {paymentMethod === "credit-card" && (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          />
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="text"
                              id="expiryDate"
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="text"
                              id="cvv"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                              placeholder="123"
                              maxLength={4}
                              className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mb-6">
                        <input
                          id="saveCard"
                          type="checkbox"
                          checked={saveCard}
                          onChange={() => setSaveCard(!saveCard)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all"
                        />
                        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                          Save this card for future payments
                        </label>
                      </div>

                      <div className="flex items-center justify-center bg-gray-50 p-4 rounded-lg mb-6">
                        <Lock className="h-5 w-5 text-gray-500 mr-2" />
                        <p className="text-sm text-gray-600">
                          Your payment information is secure (simulated for demo).
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay Now <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <PaypalLogo className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Pay with PayPal</h3>
                        <p className="text-gray-600 mb-6">
                          Click below to simulate a PayPal payment (demo mode).
                        </p>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to PayPal <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {paymentMethod === "crypto" && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Select Cryptocurrency</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { id: "bitcoin", icon: Bitcoin, label: "Bitcoin" },
                            { id: "ethereum", icon: Ethereum, label: "Ethereum" },
                            { id: "usdc", icon: DollarSign, label: "USDC" },
                          ].map((crypto) => (
                            <button
                              key={crypto.id}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                selectedCrypto === crypto.id
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedCrypto(crypto.id)}
                            >
                              <crypto.icon
                                className={`h-10 w-10 mb-2 ${
                                  selectedCrypto === crypto.id ? "text-indigo-600" : "text-gray-500"
                                }`}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  selectedCrypto === crypto.id ? "text-indigo-600" : "text-gray-600"
                                }`}
                              >
                                {crypto.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6 text-center">
                        <div className="mb-6">
                          <div className="bg-white p-4 rounded-lg inline-block mb-4 shadow-md hover:shadow-lg transition-shadow">
                            <QrCode className="h-40 w-40 text-gray-800 mx-auto" />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Send exactly</p>
                          <div className="font-bold text-2xl mb-2">
                            {selectedCrypto === "bitcoin"
                              ? "0.00425 BTC"
                              : selectedCrypto === "ethereum"
                              ? "0.0621 ETH"
                              : "240.00 USDC"}
                          </div>
                          <div className="relative max-w-sm mx-auto">
                            <input
                              type="text"
                              value={
                                selectedCrypto === "bitcoin"
                                  ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                  : selectedCrypto === "ethereum"
                                  ? "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                                  : "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                              }
                              className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg bg-gray-100 text-sm text-gray-800 font-mono"
                              readOnly
                            />
                            <button
                              onClick={() => navigator.clipboard.write(
                                selectedCrypto === "bitcoin"
                                  ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                  : selectedCrypto === "ethereum"
                                  ? "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                                  : "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                              )}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <Copy className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Click below to simulate a cryptocurrency payment (demo mode).
                        </p>
                        <button
                          onClick={handleSubmit}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Pay with {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)}{" "}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
                <div className="bg-gray-50 py-4 px-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>
                <div className="p-6">
                  {booking ? (
                    <>
                      <div className="flex items-start mb-6">
                        <img
                          src={
                            JSON.parse(localStorage.getItem("cars") || "[]").find((c) => c.id === booking.carId)
                              ?.image || "/src/assets/car-detail.jpg"
                          }
                          alt={booking.car}
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{booking.car}</h3>
                          <div className="text-sm text-gray-600 mt-1">3 days rental</div>
                          <div className="text-sm text-gray-600">
                            {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-b py-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Car Rental (3 days)</span>
                          <span>${(booking.pricePerDay * 3).toFixed(2)}</span>
                        </div>
                        {booking.extras.gps && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">GPS Navigation</span>
                            <span>$15.00</span>
                          </div>
                        )}
                        {booking.extras.childSeat && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Child Seat</span>
                            <span>$30.00</span>
                          </div>
                        )}
                        {booking.extras.additionalDriver && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Additional Driver</span>
                            <span>$45.00</span>
                          </div>
                        )}
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Taxes & Fees</span>
                          <span>${(booking.total * 0.1).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>${booking.total}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600">No booking data available.</p>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-gray-800">Secure Booking Guarantee</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Free cancellation up to 48 hours before pickup (demo mode).
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    By completing this booking, you agree to our{" "}
                    <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
                      Privacy Policy
                    </Link>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;