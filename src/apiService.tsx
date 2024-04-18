import axios, { AxiosResponse } from 'axios';
import { RegisterUserData , UserData , EmployeeData } from './types';

const API_BASE_URL = 'http://localhost:5055/api';

const apiService = {
  registerUser: async (userData: RegisterUserData): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/Authentication/register`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error registering user');
    }
  },

  loginUser: async (userData: UserData): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/Authentication/login`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error logging in');
    }
  },

  getAllEmployees: (): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/Employees/get-all-employees`);
  },

  getCountries: (): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/Country/get-countries`);
  },

  getAllCities: (): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/City/get-all-cities`);
  },

  getAllStates: (): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/States/get-all-states`);
  },

  getCitiesByState: (stateId: string): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/City/get-cities-by-state/${stateId}`);
  },

  getStatesByCountry: (countryId: string): Promise<AxiosResponse<any>> => {
    return axios.get(`${API_BASE_URL}/States/get-states-by-country/${countryId}`);
  },

//   addEmployee: (employeeData: EmployeeData): Promise<AxiosResponse<any>> => {
//     return axios.post(`${API_BASE_URL}/Employees/add-employee/`, employeeData);
//   },

//   updateEmployee: (employeeId: string, employeeData: EmployeeData): Promise<AxiosResponse<any>> => {
//     return axios.put(`${API_BASE_URL}/Employees/update-employee/${employeeId}`, employeeData);
//   },

  deleteEmployee: (employeeId: string): Promise<AxiosResponse<any>> => {
    return axios.delete(`${API_BASE_URL}/Employees/delete-employee/${employeeId}`);
  },
};

export default apiService;
