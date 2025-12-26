// controllers/cateringController.js
import CateringRequest from "../models/CateringRequest.js";

export const createCatering = async (req, res) => {
  try {
    const catering = await CateringRequest.create(req.body);
    res.status(201).json({ success: true, data: catering });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCateringRequests = async (req, res) => {
  try {
    const requests = await CateringRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCateringStatus = async (req, res) => {
  try {
    const request = await CateringRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCateringRequest = async (req, res) => {
  try {
    await CateringRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Catering request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
