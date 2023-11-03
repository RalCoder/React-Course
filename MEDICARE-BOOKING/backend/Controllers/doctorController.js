import Doctor from "../models/DoctorSchema.js";
import BookingSchema from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id

    try {

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res.status(200).json({ success: true, message: 'Successfully Updated', data: updatedDoctor })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Update' })
    }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id

    try {

        await Doctor.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: 'Successfully Deleted' })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Delete' })
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id

    try {

        const Doctor = await Doctor.findById(id).populate("reviews").select("-password");

        res.status(200).json({ success: true, message: 'Doctor Found', data: Doctor })

    } catch (error) {
        res.status(404).json({ success: false, message: 'No Doctor found' })
    }
};

export const getAllDoctor = async (req, res) => {

    try {

        const { query } = req.query
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved', $or: [{ name: { $regex: query, $options: "i" } }, { specialization: { $regex: query, $options: "i" } }
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({ success: true, message: 'Doctor Found', data: doctors })

    } catch (error) {
        res.status(404).json({ success: false, message: 'Not found' })
    }
};

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.doctorId

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }

        const { password, ...rest } = doctor._doc
        const appointments = await Booking.find({doctor: doctorId})

        res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest, appointments } })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
}