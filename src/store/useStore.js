import { create } from "zustand";
import {
  getDoctors,
  getDoctorById,
  getAppointments,
  createAppointment,
  updateAppointment as updateAppointmentAPI,
  deleteAppointment as deleteAppointmentAPI,
} from "../services/api";

const useStore = create((set) => ({
  appointmentsList: [],
  doctorsList: [],
  isLoading: false,
  error: null,
  successMessage: "",
  selectedDoctor: null,

  fetchAppointments: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getAppointments();

      set({
        appointmentsList: response.data,
        isLoading: false,
      });
    } catch {
      set({
        error: "Failed to fetch appointments.",
        isLoading: false,
      });
    }
  },

  addAppointment: async (newAppointment) => {
    set({ isLoading: true, error: null, successMessage: "" });

    try {
      const response = await createAppointment({
        ...newAppointment,
        status: "Pending",
      });

      set((state) => ({
        appointmentsList: [
          ...state.appointmentsList,
          response.data,
        ],
        isLoading: false,
        successMessage: "Appointment booked successfully!",
      }));

      return true;
    } catch {
      set({
        error: "Failed to book appointment.",
        isLoading: false,
      });

      return false;
    }
  },

  updateAppointment: async (
    id,
    updatedAppointment,
    successMessage = "Appointment updated successfully!"
  ) => {
    set({ isLoading: true, error: null, successMessage: "" });

    try {
      const response = await updateAppointmentAPI(
        id,
        updatedAppointment
      );

      set((state) => ({
        appointmentsList: state.appointmentsList.map((appointment) =>
          appointment.id === id ? response.data : appointment
        ),
        isLoading: false,
        successMessage: successMessage,
      }));

      return true;
    } catch {
      set({
        error: "Failed to update appointment.",
        isLoading: false,
      });

      return false;
    }
  },

  deleteAppointment: async (id) => {
    set({ isLoading: true, error: null, successMessage: "" });

    try {
      await deleteAppointmentAPI(id);

      set((state) => ({
        appointmentsList: state.appointmentsList.filter(
          (appointment) => appointment.id !== id
        ),
        isLoading: false,
        successMessage: "Appointment deleted successfully!",
      }));

      return true;
    } catch {
      set({
        error: "Failed to delete appointment.",
        isLoading: false,
      });

      return false;
    }
  },

  fetchDoctors: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getDoctors();

      set({
        doctorsList: response.data,
        isLoading: false,
      });
    } catch {
      set({
        error: "Failed to fetch doctors data.",
        isLoading: false,
      });
    }
  },

  fetchDoctorById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getDoctorById(id);

      set({
        isLoading: false,
        selectedDoctor: response.data,
      });
    } catch {
      set({
        error: "Failed to fetch doctor details.",
        isLoading: false,
        selectedDoctor: null,
      });
    }
  },
}));

export default useStore;