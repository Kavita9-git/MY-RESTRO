// controllers/tableController.js
import TableBooking from "../models/TableBooking.js";

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const booking = await TableBooking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await TableBooking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBooking = async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    await TableBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
