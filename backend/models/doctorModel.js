import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String, // Changed from specialization
  experience: Number,
  rating: { type: Number, default: 0 },
  language: { type: [String], default: [] },
    fees: Number,
  gender: String,
  availability: [String],
  city: String,       // Changed from location
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
