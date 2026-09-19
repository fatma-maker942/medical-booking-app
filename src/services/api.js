import axios from "axios";

const API_URL = "http://localhost:3000";

export const getDoctors = () => {
  return axios.get(`${API_URL}/doctors`);
};

export const getDoctorById = (id) => {
  return axios.get(`${API_URL}/doctors/${id}`);
};

export const getAppointments = () => {
  return axios.get(`${API_URL}/appointments`);
};

export const createAppointment = (appointment) => {
  return axios.post(`${API_URL}/appointments`, appointment);
};

export const updateAppointment = (id, appointment) => {
  return axios.put(`${API_URL}/appointments/${id}`, appointment);
};

export const deleteAppointment = (id) => {
  return axios.delete(`${API_URL}/appointments/${id}`);
};
