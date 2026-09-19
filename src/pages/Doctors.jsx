import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import DoctorCard from "../components/DoctorCard";
import { Input } from "@/components/ui/input";

export default function Doctors() {
  const doctorsList = useStore((state) => state.doctorsList);
  const fetchDoctors = useStore((state) => state.fetchDoctors);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctorsList.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === "" ||
      doctor.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  const uniqueSpecialties = [
    ...new Set(doctorsList.map((doctor) => doctor.specialty)),
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Available Doctors
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 focus-visible:ring-teal-500"/>

          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">All Specialties</option>

            {uniqueSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-teal-600 font-medium py-10">
          Loading doctors...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-medium py-10">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredDoctors.length === 0 && (
        <div className="text-center text-gray-500 font-medium py-10">
          No doctors found.
        </div>
      )}

      {!isLoading && !error && filteredDoctors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}