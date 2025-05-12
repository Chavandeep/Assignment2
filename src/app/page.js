"use client";

import Head from 'next/head';
import { useEffect, useState } from 'react';
// import axios from 'axios'; // Commenting out axios since we're using static data
import doctorsData from './doctorData'; // Adjust path as needed

export default function DoctorListing() {
  const [doctors, setDoctors] = useState(doctorsData); // Initialize with static data
  const [filters, setFilters] = useState({
    mode_of_consult: '',
    experience_min: '',
    experience_max: '',
    fees_min: '',
    fees_max: '',
    language: '',
    facility: '',
  });
  const [page, setPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(doctorsData.length);

  // Filter the doctors when filters or page changes
  useEffect(() => {
    const filteredDoctors = doctorsData.filter(doctor => {
      let isValid = true;

      // Apply filters
      if (filters.mode_of_consult && doctor.mode_of_consult !== filters.mode_of_consult) {
        isValid = false;
      }
      if (filters.experience_min && doctor.experience < parseInt(filters.experience_min)) {
        isValid = false;
      }
      if (filters.experience_max && doctor.experience > parseInt(filters.experience_max)) {
        isValid = false;
      }
      if (filters.fees_min && doctor.fees < parseInt(filters.fees_min)) {
        isValid = false;
      }
      if (filters.fees_max && doctor.fees > parseInt(filters.fees_max)) {
        isValid = false;
      }
      if (filters.language && doctor.language !== filters.language) {
        isValid = false;
      }
      if (filters.facility && doctor.facility !== filters.facility) {
        isValid = false;
      }

      return isValid;
    });

    setDoctors(filteredDoctors);
    setTotalDoctors(filteredDoctors.length);
  }, [filters, page]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? value : '') : value,
    }));
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const selectedFilters = Object.entries(filters)
    .filter(([_, v]) => v !== '')
    .map(([k, v]) => `${k}: ${v}`);

  return (
    <>
      <Head>
        <title>General Physician - Apollo Clone</title>
        <meta name="description" content="Consult experienced general physicians and internal medicine doctors online." />
        <link rel="canonical" href="https://yourclone.com/specialties/general-physician-internal-medicine" />
        <meta property="og:title" content="General Physician - Apollo Clone" />
        <meta property="og:description" content="Consult experienced general physicians and internal medicine doctors online." />
      </Head>

      {/* Top Header */}
      <header className="bg-white border-b shadow px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <img src="https://newassets.apollo247.com/images/ic_logo.png" alt="Apollo 24|7" className="h-8" />
          <button className="text-sm text-gray-600 border px-3 py-1 rounded">Select Location</button>
        </div>
        <input type="text" placeholder="Search Doctors, Specialities, Conditions etc." className="border px-4 py-2 w-1/2 rounded" />
        <button className="text-sm border rounded px-4 py-1">Login</button>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white border-b px-6 py-2 text-center space-x-6 text-sm font-medium text-gray-700">
        <a href="#">Buy Medicines</a>
        <a href="#">Find Doctors</a>
        <a href="#">Lab Tests</a>
        <a href="#">Circle Membership</a>
        <a href="#">Health Records</a>
        <a href="#">Diabetes Reversal</a>
        <a href="#">Buy Insurance</a>
      </nav>

      <main className="flex justify-center px-4 md:px-8 bg-[#f9f9f9] min-h-screen">
        <div className="max-w-7xl w-full flex gap-6 py-8">

          {/* Filter Sidebar with Scroll */}
          <aside className="w-72 bg-white p-4 border rounded shadow-sm sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
            {selectedFilters.length > 0 && (
              <div className="mb-4 text-sm text-blue-600 font-medium">
                <p>Selected Filters:</p>
                <ul className="list-disc list-inside">
                  {selectedFilters.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <button className="text-blue-600 text-sm mb-4">Show Doctors Near Me</button>

            {/* Mode of Consult */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Mode of Consult</h3>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="mode_of_consult" value="hospital_visit" onChange={handleChange} className="mr-3 w-5 h-5" /> Hospital Visit
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="mode_of_consult" value="online_consult" onChange={handleChange} className="mr-3 w-5 h-5" /> Online Consult
              </label>
            </div>

            {/* Experience (In Years) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Experience (In Years)</h3>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="experience_min" value="0" onChange={handleChange} className="mr-3 w-5 h-5" /> 0-5
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="experience_min" value="6" onChange={handleChange} className="mr-3 w-5 h-5" /> 6-10
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="experience_min" value="11" onChange={handleChange} className="mr-3 w-5 h-5" /> 11-16
              </label>
            </div>

            {/* Fees (In Rupees) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Fees (In Rupees)</h3>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="fees_min" value="100" onChange={handleChange} className="mr-3 w-5 h-5" /> 100-500
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="fees_min" value="500" onChange={handleChange} className="mr-3 w-5 h-5" /> 500-1000
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="fees_min" value="1000" onChange={handleChange} className="mr-3 w-5 h-5" /> 1000+
              </label>
            </div>

            {/* Language */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Language</h3>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="language" value="english" onChange={handleChange} className="mr-3 w-5 h-5" /> English
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="language" value="hindi" onChange={handleChange} className="mr-3 w-5 h-5" /> Hindi
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="language" value="telugu" onChange={handleChange} className="mr-3 w-5 h-5" /> Telugu
              </label>
            </div>

            {/* Facility */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Facility</h3>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="facility" value="apollo_hospital" onChange={handleChange} className="mr-3 w-5 h-5" /> Apollo Hospital
              </label>
              <label className="flex items-center mb-2 text-sm">
                <input type="checkbox" name="facility" value="other_clinics" onChange={handleChange} className="mr-3 w-5 h-5" /> Other Clinics
              </label>
            </div>

            {/* +1 More and +10 More */}
            <button className="text-sm text-blue-600 mb-4">+1 More</button>
            <button className="text-sm text-blue-600 mb-4">+10 More</button>
          </aside>

          {/* Doctor Listing Section */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold text-gray-800">
                Consult General Physicians Online - Internal Medicine Specialists ({totalDoctors} doctors)
              </h1>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">Experience: {doctor.experience} years</p>
                  <p className="text-sm text-gray-500">Fees: ₹{doctor.fees}</p>
                  <p className="text-sm text-gray-500 capitalize">Mode: {doctor.mode_of_consult.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-500 capitalize">Language: {doctor.language}</p>
                  <p className="text-sm text-gray-500 capitalize">Facility: {doctor.facility.replace('_', ' ')}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Previous
              </button>
              <span className="px-4 py-2 bg-white border rounded">Page {page}</span>
              <button onClick={nextPage} disabled={doctors.length < 6} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Next
              </button>
            </div>
          </section>

          {/* Right Side Empty Space */}
          <div className="w-32"></div>
        </div>
      </main>
    </>
  );
}
