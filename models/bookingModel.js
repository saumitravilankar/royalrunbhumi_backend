const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
        turf: {
            type: String,
            required: [true, "Please mention the turf"]
        },
        name: {
            type: String,
            required: [true, "Please add the name"]
        },
        contact: {
            type: String,
            required: [true, "Please add the contact number"]
        },
        email: {
            type: String,
            required: [true, "Please add the contact number"]
        },
        booking_date: {
            type: String,
            required: [true, "Please add the date"]
        },
        booked_slot: {
            type: Array,
            required: [true, "Please add the slots"]
        },
        booked_time: {
            type: String,
            required: [true, "Please add the slots"]
        },
        payment_id: {
            type: String,
            required: [true, "Please add the slots"]
        },
        reserved: {
            type: Boolean,
            required: [true, "Please add the payment status"]
        },
        booked: {
            type: Boolean,
            required: [true, "Please add the payment status"]
        }
    },
    {
        timeStamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);