import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentConfirmation = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (bookings.length > 0) {
      setBooking(bookings[bookings.length - 1]);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking Confirmed!</h2>
        {booking ? (
          <>
            <p className="text-gray-600 mb-6">
              Thank you for your booking. Your car rental is confirmed (demo mode).
            </p>
            <div className="text-left max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-4">Booking Details</h3>
              <p>
                <strong>Car:</strong> {booking.car}
              </p>
              <p>
                <strong>Pickup Location:</strong> {booking.pickupLocation}
              </p>
              <p>
                <strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Return Date:</strong> {new Date(booking.returnDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Extras:</strong>{" "}
                {[
                  booking.extras.gps && "GPS Navigation",
                  booking.extras.childSeat && "Child Seat",
                  booking.extras.additionalDriver && "Additional Driver",
                ]
                  .filter(Boolean)
                  .join(", ") || "None"}
              </p>
              <p>
                <strong>Total:</strong> ${booking.total}
              </p>
              <p>
                <strong>Payment Method:</strong> {booking.paymentMethod}
              </p>
            </div>
            <Link
              to="/"
              className="mt-6 inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full"
            >
              Back to Home
            </Link>
          </>
        ) : (
          <p className="text-gray-600">No booking data found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;