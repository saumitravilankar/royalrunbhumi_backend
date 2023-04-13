const express = require("express");
const router = express.Router();
const { getBookings, getBookingsByDate, getBookingsByTurf, getBookingsByTurfDate, createBooking, getBooking, updateBooking, deleteBooking, checkout, paymentVerification } = require("../controller/slotController")

// Get and create bookings
router.route("/").get(getBookings).post(createBooking)

// Get, Update, Delete a single Booking
router.route("/:id").get(getBooking).put(updateBooking).delete(deleteBooking)

// Get date wise bookings
router.route("/date/:date").get(getBookingsByDate)

// Get turf wise bookings
router.route("/turf/:turf").get(getBookingsByTurf)

// Get turf & date wise bookings
router.route("/:turf/:date/").get(getBookingsByTurfDate)

// Checkout bookings
router.route("/checkout/").post(checkout)

// Payment Verification
router.route("/checkout/payment-verification/").post(paymentVerification)




module.exports = router;