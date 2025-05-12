import Doctor from '../models/doctorModel.js';

export const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDoctorsWithFilters = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        query[key] = { $in: filters[key] };
      } else {
        query[key] = filters[key];
      }
    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
