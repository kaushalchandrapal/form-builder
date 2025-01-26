import { HttpClient } from "../utils";

export const AuthService = () => {
  return {
    registrationAPI: (payload)=> HttpClient.post('/auth/register', payload),
    loginAPI: (payload)=> HttpClient.post('/auth/login', payload),
  };
};

export const FormService = () => {
  return {
    saveFormAPI: (payload) => HttpClient.post('/api/forms/save', payload),
    updateFormAPI: (payload) => HttpClient.put(`/api/forms/update/${payload.id}`, payload.payload),
    getAllFormAPI: () => HttpClient.get(`/api/forms/list`),
  };
};