import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import AppointmentCard from "../components/AppointmentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function Appointments() {
  const appointmentsList = useStore((state) => state.appointmentsList);
  const fetchAppointments = useStore((state) => state.fetchAppointments);
  const updateAppointment = useStore((state) => state.updateAppointment);
  const deleteAppointment = useStore((state) => state.deleteAppointment);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const successMessage = useStore((state) => state.successMessage);

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
  };

  const handleUpdate = async () => {
    if (!editDate || !editTime) {
      alert("Please fill in the date and time.");
      return;
    }

    await updateAppointment(editingAppointment.id, {
      ...editingAppointment,
      date: editDate,
      time: editTime,
    });

    setEditingAppointment(null);
  };

  const handleCancel = async (appointment) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) {
      return;
    }

    await updateAppointment(
      appointment.id,
      {
        ...appointment,
        status: "Cancelled",
      },
      "Appointment cancelled successfully!",
    );
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) {
      return;
    }

    await deleteAppointment(id);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Appointments</h1>
      </div>

      {successMessage && (
        <div className="mb-6 p-3 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 rounded-md bg-red-50 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center text-teal-600 font-medium py-10">
          Loading appointments...
        </div>
      )}

      {!isLoading && !error && appointmentsList.length === 0 && (
        <div className="text-center text-gray-500 font-medium py-10">
          No appointments found.
        </div>
      )}

      {!isLoading && appointmentsList.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {appointmentsList.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium text-slate-700">
                      {appointment.patient}
                    </TableCell>

                    <TableCell className="text-teal-700 font-medium">
                      {appointment.doctor}
                    </TableCell>

                    <TableCell className="text-slate-600">
                      {appointment.date}
                    </TableCell>

                    <TableCell className="text-slate-600">
                      {appointment.time}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          appointment.status === "Confirmed"
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : appointment.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(appointment)}
                          className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition-colors"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleCancel(appointment)}
                          disabled={appointment.status === "Cancelled"}
                          className="px-3 py-1 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="px-3 py-1 bg-rose-600 text-white rounded-md text-sm hover:bg-rose-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden grid grid-cols-1 gap-4">
            {appointmentsList.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}

      {editingAppointment && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-slate-800 mb-5">
            Reschedule Appointment
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Date
              </label>

              <Input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Time
              </label>

              <Input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleUpdate}
              className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingAppointment(null)}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
