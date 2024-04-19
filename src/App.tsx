import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { useForm } from 'react-hook-form';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import apiService from './apiService';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { UserData, RegisterUserData, Employee, EmployeeData, Country, City, State } from './types';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<Employee[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [countries, setCountries] = useState<{ [key: number]: string }>({});
  const [states, setStates] = useState<{ [key: number]: string }>({});
  const [cities, setCities] = useState<{ [key: number]: string }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const { reset, control } = useForm();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUser(null);
    message.success("Logged out successfully!");
  };

  const handleRegister = (userData: RegisterUserData) => {
    apiService.registerUser(userData)
      .then((response:any) => {
        console.log(response);
        setShowRegisterForm(false);
        message.success("User added successfully!");
      })
      .catch((error:any) => {
        console.error('Error registering user:', error);
      });
  }

  const handleLogin = (userData: UserData) => {
    apiService.loginUser(userData)
      .then((response:any) => {
        message.success("User logged in successfully!");
        const token = response.message;
        setUser(userData);
        setLoggedIn(true);
        localStorage.setItem('token', token);
      })
      .catch((error:any) => {
        console.error('Error logging in:', error);
        message.warning('Invalid Email/Password');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }

    apiService.getAllEmployees()
      .then((response:any) => {
        const responseData : Employee[] = response.data;
        setData(responseData);
      })
      .catch((error:any) => console.error('Error fetching data:', error));

    apiService.getCountries()
      .then((response:any) => {
        const responseData : Country[] = response.data;
        const countryMap: { [key: number]: string } = {};
        responseData.forEach((country:any) => {
          countryMap[country.id] = country.countryName;
        });
        setCountries(countryMap);
      })
      .catch((error:any) => console.error('Error fetching countries:', error));

    apiService.getAllCities()
      .then((response:any) => {
        const responseData : City[] = response.data;
        const cityMap: { [key: number]: string } = {};
        responseData.forEach((city:any) => {
          cityMap[city.id] = city.cityName;
        });
        setCities(cityMap);
      })
      .catch((error:any) => console.error('Error fetching cities:', error));

    apiService.getAllStates()
      .then((response:any) => {
        const responseData : State[] = response.data;
        const stateMap: { [key: number]: string } = {};
        responseData.forEach((state:any) => {
          stateMap[state.id] = state.stateName;
        });
        setStates(stateMap);
      })
      .catch((error:any) => console.error('Error fetching states:', error));

  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    console.log(selectedEmployee);
  };

  const handleCancel = () => {
    reset();
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleEdit = (record: Employee) => {
    setSelectedEmployee(record);
    showModal();
  };

  const onSubmit = async (formData: EmployeeData) => { // Replace 'any' with correct type if available
    const payload = new FormData();
    payload.append('photo', file as Blob);
    payload.append('firstName', formData.firstName);
    payload.append('lastName', formData.lastName);
    payload.append('email', formData.email);
    payload.append('gender', formData.gender);
    payload.append('maritalStatus', formData.maritalStatus.toString());
    payload.append('hobbies', formData.hobbies);
    payload.append('salary', formData.salary.toString());
    payload.append('address', formData.address);
    payload.append('country', formData.country || '');
    payload.append('state', formData.state || '');
    payload.append('city', formData.city || '');
    payload.append('zipCode', formData.zipCode);
    payload.append('password', formData.password);

    if (selectedEmployee) {
      await apiService.updateEmployee(selectedEmployee.id, payload)
        .then((response:any) => {
          apiService.getAllEmployees().then((res:any) => setData(res.data));
        });
    } else {
      apiService.addEmployee(payload).then((response:any) => {
        apiService.getAllEmployees().then((res:any) => setData(res.data));
      });
    }

    handleCancel();
  };

  const handleDelete = (record: Employee) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete ${record.firstName} ${record.lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        apiService.deleteEmployee(record.id)
          .then((response:any) => {
            message.success('Employee deleted successfully!');
            return apiService.getAllEmployees();
          })
          .then((updatedData:any) => {
            setData(updatedData.data);
          })
          .catch((error:any) => {
            console.error('Error deleting employee:', error);
            message.error('Failed to delete employee.');
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (id: number) => countries[id],
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (id: number) => states[id],
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: (id: number) => cities[id],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Employee) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="default" onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="forms-container">
          {showRegisterForm ? (
            <RegisterForm handleRegister={handleRegister} />
          ) : (
            <LoginForm login={handleLogin} showRegisterForm={() => setShowRegisterForm(true)} />
          )}
        </div>
      ) : (
        <EmployeeTable
          data={data}
          columns={columns}
          showModal={showModal}
          handleLogout={handleLogout}
        />
      )}
      <EmployeeForm
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={onSubmit}
        selectedEmployee={selectedEmployee}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

export default App;
