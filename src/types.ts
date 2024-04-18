export interface UserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
    email: string;
    password: string;
    confirmpassword:string
  }

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "M" | "F";
  photo: File | null;
  maritalStatus: boolean;
  birthDate: string;
  hobbies: string;
  salary: number;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string;
  password: string;
}

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  gender: "M" | "F";
  photo: File | null;
  maritalStatus: boolean;
  birthDate: string;
  hobbies: string;
  salary: number;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string;
  password: string;
}

export interface Country {
    id: string;
    countryName: string;
}

export interface City {
    id: string;
    cityName: string;
}

export interface State {
    id: string;
    stateName: string;
}
