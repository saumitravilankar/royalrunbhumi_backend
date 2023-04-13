// Here the actual logic will be writtern to get create and update the slots
const asyncHandler = require("express-async-handler")

const Booking = require("../models/bookingModel")

const Razorpay = require("razorpay");
const { response } = require("express");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET_KEY
});


// GET ALL BOOKINGS
const getBookings = asyncHandler( async (req,res) => {

    const bookings = await Booking.find();

    res.status(200).json(bookings);
});

// GET DATE WISE BOOKINGS
const getBookingsByDate = asyncHandler(async (req, res) => {
    const date = req.params.date;
    // console.log(req.params.date);
    const bookings = await Booking.find({ booking_date: date });
  
    if (!bookings) {
        res.status(400);
        throw new Error("No Bookings Found For This Date");
    } else {
      res.status(200).json(bookings);
    }
  });

// GET DATE WISE BOOKINGS
const getBookingsByTurf = asyncHandler(async (req, res) => {
    const turf = req.params.turf;
    // console.log(req.params.date);
    const bookings = await Booking.find({ turf: turf });
  
    if (!bookings) {
        res.status(400);
        throw new Error("No Bookings Found For This Date");
    } else {
      res.status(200).json(bookings);
    }
  });

// GET TURF & DATE WISE BOOKINGS
const getBookingsByTurfDate = asyncHandler(async (req, res) => {
    const date = req.params.date;
    const turf = req.params.turf;
    const bookings = await Booking.find({ 
        booking_date: date,
        turf: turf
     });
  
    if (!bookings) {
        res.status(400);
        throw new Error("No Bookings Found For This Date");
    } else {
      res.status(200).json(bookings);
    }
  });

// CREATE NEW BOOKING
const createBooking = asyncHandler(async (req, res) => {
    console.log("Created booking", req.body);
    const { turf, name, contact, email, booking_date, booked_slot, booked_time, payment_id, reserved, booked } = req.body
    if (!turf || !name || !contact || !email || !booking_date ||!booked_slot ||!booked_time ||!payment_id ||!reserved ||!booked) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const booking = await Booking.create({
        turf: req.body.turf,
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        booking_date: req.body.booking_date,
        booked_slot: req.body.booked_slot,
        booked_time: req.body.booked_time,
        payment_id: req.body.payment_id,
        reserved: req.body.reserved,
        booked: req.body.booked,
    });

    res.status(201).json(booking);
});

// GET BOOKING BY ID
const getBooking = asyncHandler (async (req,res) => {

    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(booking);
});

// UPDATE BOOKING
const updateBooking = asyncHandler( async (req,res) => {

    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// DELETE BOOKING
const deleteBooking = asyncHandler( async (req,res) => {

    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
        res.status(404);
        throw new Error("Contact not found")
    }

    res.status(200).json(booking);
});

// Checkout Function
const checkout = async (req,res) => {

    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
        success : true,
        order
    })

};

const paymentVerification = async (req,res) => {

    console.log(req.body);
    
    res.status(200).json({
        success:true
    })

};


module.exports = { getBookings, getBookingsByDate, getBookingsByTurf, getBookingsByTurfDate, createBooking, getBooking, updateBooking, deleteBooking, checkout, paymentVerification};